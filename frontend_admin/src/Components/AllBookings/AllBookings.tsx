import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import {
  Container,
  Dropdown,
  Header,
  Form,
  Radio,
  Table,
  Message,
  Button,
  InputOnChangeData,
  CheckboxProps,
  Loader,
} from 'semantic-ui-react';
import { useTable, useExpanded } from 'react-table';
import Fuse from 'fuse.js';
import { LoadStates } from 'src/shared/enums';
import { Show, Ticket } from 'src/shared/types';

const columns = [
  {
    // Make an expander cell
    Header: () => null, // No header
    id: 'expander', // It needs an ID
    Cell: ({ row }: { row: any }) => (
      // Use Cell to render an expander for each row.
      // We can use the getToggleRowExpandedProps prop-getter
      // to build the expander.
      <span {...row.getToggleRowExpandedProps()}>
        {row.isExpanded ? '👇' : '👉'}
      </span>
    ),
  },
  {
    Header: 'Order ID',
    accessor: 'id',
    Cell: (a: any) => (a.value ? a.value.slice(0, 6).toUpperCase() : ''),
  },
  {
    Header: 'Name',
    accessor: 'name', // accessor is the "key" in the data
  },
  {
    Header: 'Num Seats',
    accessor: 'numSeats',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Phone',
    accessor: 'phone',
  },
  {
    Header: 'Amount',
    accessor: 'subtotalPrice',
    // TODO: use a proper currency thing
    Cell: (props: any) => `$${(props.value / 100).toFixed(2)}`,
  },
  {
    Header: 'Paid?',
    accessor: (d: any) =>
      d.paid === true ? (
        'Yes'
      ) : d.id ? (
        <Button>
          <Link to={`/override-payment/${d.id}`}>Override Payment</Link>
        </Button>
      ) : (
        ''
      ),
  },
];

const subColumns = [
  {
    Header: 'Ticket ID',
    accessor: (a: any) => a.id.slice(0, 8).toUpperCase(),
  },
  {
    Header: 'Name',
    accessor: 'name', // accessor is the "key" in the data
  },
  {
    Header: 'Phone',
    accessor: 'phone',
  },
  {
    Header: 'Postcode',
    accessor: 'postcode',
  },
  {
    Header: 'Type',
    accessor: 'ticketType.description',
  },
  {
    Header: 'Checked in?',
    accessor: (a: any) =>
      a.checkInTime
        ? dayjs(a.checkInTime).format('ddd DD MMM YYYY hh:mm:ss')
        : 'No',
  },
];

function MySubTable({ data, columns }: { data: any; columns: any }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <Table celled {...getTableProps()}>
      <Table.Header>
        {headerGroups.map((headerGroup) => (
          <Table.Row {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Table.HeaderCell {...column.getHeaderProps()}>
                {column.render('Header')}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        ))}
      </Table.Header>
      <Table.Body {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            /*row.getRowProps() has issues with React.Fragment*/
            /**/
            <Table.Row {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <Table.Cell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </Table.Cell>
                );
              })}
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}

// react-table only works with functional components.
function MyTable({ data, columns }: { data: any; columns: any }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    // @ts-ignore
    state: { expanded },
  } = useTable(
    {
      columns,
      data,
    },
    useExpanded
  );

  return (
    <Table celled {...getTableProps()}>
      <Table.Header>
        {headerGroups.map((headerGroup) => (
          <Table.Row {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Table.HeaderCell {...column.getHeaderProps()}>
                {column.render('Header')}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        ))}
      </Table.Header>
      <Table.Body {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            /*row.getRowProps() has issues with React.Fragment*/
            /*...row.getRowProps()*/
            <React.Fragment>
              <Table.Row>
                {row.cells.map((cell) => {
                  return (
                    <Table.Cell {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </Table.Cell>
                  );
                })}
              </Table.Row>
              {
                // @ts-ignore
                row.isExpanded ? (
                  <Table.Row>
                    <Table.Cell colSpan={visibleColumns.length}>
                      {renderRowSubComponent({ row })}
                    </Table.Cell>
                  </Table.Row>
                ) : undefined
              }
            </React.Fragment>
          );
        })}
      </Table.Body>
    </Table>
  );
}

function renderRowSubComponent({ row }: { row: any }) {
  if (row.original.tickets) {
    return <MySubTable data={row.original.tickets} columns={subColumns} />;
  }
  return <Message color="orange">Ticket listings unavailable</Message>;
}

// TODO: evaluate if we really need this
const searchTypeToCol = {
  name: 'name',
  email: 'email',
  phone: 'phone',
};

interface AllBookingsProps {
  tickets: Ticket[];
  shows: Show[];
  loadingState: LoadStates;
  ShowNightSelectorElement: JSX.Element;
}

export class AllBookings extends React.Component<AllBookingsProps> {
  state = {
    showId: undefined,
    searchType: 'name',
    search: '',
  };

  searchChange = (
    e: React.FormEvent<HTMLInputElement>,
    { value }: InputOnChangeData
  ) => this.setState({ search: value });

  handleChange = (
    e: React.FormEvent<HTMLInputElement>,
    { value }: CheckboxProps
  ) => this.setState({ searchType: value });

  async checkIn(ticketId: string) {
    // TODO: use proper ID
    const showRes = await fetch(
      `${process.env.REACT_APP_API_URL}/admin/tickets/${ticketId}/check-in`,
      { method: 'POST', credentials: 'include' }
    );

    if (showRes.status === 200 && this.state.showId) {
      await this.fetchTickets(this.state.showId);
    }
  }

  async reverseCheckIn(ticketId: string) {
    // TODO: use proper ID
    const showRes = await fetch(
      `${process.env.REACT_APP_API_URL}/admin/tickets/${ticketId}/check-in-reverse`,
      { method: 'POST', credentials: 'include' }
    );

    if (showRes.status === 200 && this.state.showId) {
      await this.fetchTickets(this.state.showId);
    }
  }

  async fetchTickets(showId: any) {
    const showRes = await fetch(
      `${process.env.REACT_APP_API_URL}/admin/shows/${showId}/tickets`,
      { credentials: 'include' }
    );

    if (showRes.ok) {
      const data = await showRes.json();
      this.setState({ data: data });
    }
  }

  onShowNightChange = (e: any, data: any) => {
    this.setState({ showId: data.value });
    this.fetchTickets(data.value);
  };

  private Nights = this.props.shows.map((show, index) => ({
    key: show.id,
    text: `Night ${index + 1} - ${new Date(show.time).toLocaleString()}`,
    value: show.id,
  }));

  render() {
    const { searchType, search } = this.state;
    const { loadingState, tickets, ShowNightSelectorElement } = this.props;

    // TODO: check if react-table filter will do a better job
    // @ts-ignore
    const keys = [searchTypeToCol[searchType]];
    if (searchType === 'name' || searchType === 'phone')
      keys.push(`tickets.${searchTypeToCol[searchType]}`);
    const fuse = new Fuse(tickets, { keys });
    // Display all results if no search string.
    const filteredData = search
      ? fuse.search(search).map((a) => a.item)
      : tickets;

    let tableDisplay = <Message info>Please select a show night</Message>;

    if (
      filteredData &&
      filteredData.length &&
      loadingState === LoadStates.LOADED
    ) {
      /* TODO: make sortable */
      tableDisplay = <MyTable data={filteredData} columns={columns} />;
    } else if (
      this.state.showId !== undefined &&
      loadingState === LoadStates.LOADED
    ) {
      tableDisplay = <Message error>No tickets found for this night</Message>;
    } else if (loadingState === LoadStates.LOADING) {
      tableDisplay = <Loader>Loading tickets</Loader>;
    }

    return (
      <Container style={{ marginTop: '7rem' }}>
        <Header as="h1">All Bookings</Header>

        {ShowNightSelectorElement}

        <p>Find by:</p>
        <Form>
          <Form.Field>
            <Radio
              label="Name"
              name="radioGroup"
              value="name"
              checked={searchType === 'name'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="Email"
              name="radioGroup"
              value="email"
              checked={searchType === 'email'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="Phone"
              name="radioGroup"
              value="phone"
              checked={searchType === 'phone'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Input
            icon={{ name: 'search', circular: true, link: true }}
            value={search}
            placeholder="Search..."
            onChange={this.searchChange}
          />
        </Form>
        {tableDisplay}
      </Container>
    );
  }
}
