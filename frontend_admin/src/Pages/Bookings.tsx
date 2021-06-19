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
} from 'semantic-ui-react';

import { useTable, useExpanded } from 'react-table';
//import { QuickScore } from "quick-score";
import Fuse from 'fuse.js';

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

class FindBooking extends React.Component {
  state = {
    data: [],
    nights: [
      {
        key: 1,
        text: 'Night 1 - 13 April 2021',
        value: 1,
      },
    ],
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

  async componentDidMount() {
    const showRes = await fetch(
      `${process.env.REACT_APP_API_URL}/productions/1/shows`
    );

    if (showRes.ok) {
      const data = await showRes.json();
      console.log(data);
      const nights = data.map((a: any, i: any) => ({
        key: a.id,
        text: `Night ${i + 1} - ${new Date(a.time).toLocaleString()}`,
        value: a.id,
      }));
      this.setState({ nights });
    }

    if (this.state.showId) {
      this.fetchTickets(this.state.showId);
    }
  }

  onShowNightChange = (e: any, data: any) => {
    this.setState({ showId: data.value });
    this.fetchTickets(data.value);
  };

  render() {
    const { nights, data, searchType, search } = this.state;

    // TODO: check if react-table filter will do a better job
    // @ts-ignore
    const keys = [searchTypeToCol[searchType]];
    if (searchType === 'name' || searchType === 'phone')
      keys.push(`tickets.${searchTypeToCol[searchType]}`);
    const fuse = new Fuse(data, { keys });
    // Display all results if no search string.
    const filteredData = search ? fuse.search(search).map((a) => a.item) : data;
    console.log(this.state);

    return (
      <Container style={{ marginTop: '7em' }}>
        <Header as="h1">Find Booking</Header>

        <p>Select show:</p>
        <div style={{ marginBottom: '1em' }}>
          <Dropdown
            placeholder="Select show night"
            selection
            options={nights}
            value={this.state.showId}
            onChange={this.onShowNightChange}
          />
        </div>

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

        {/* TODO: make sortable */}
        <MyTable
          data={
            filteredData.length
              ? filteredData
              : [
                  {
                    name:
                      this.state.showId === undefined
                        ? 'Please select a show night'
                        : 'No tickets found for this night',
                    subtotalPrice: 0,
                  },
                ]
          }
          columns={columns}
        />
      </Container>
    );
  }
}

export default FindBooking;
