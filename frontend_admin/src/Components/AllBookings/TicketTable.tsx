import dayjs from 'dayjs';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useTable, useExpanded, Row, UseExpandedRowProps } from 'react-table';
import { Table, Message, Button } from 'semantic-ui-react';

type ExpandableRow = Row & UseExpandedRowProps<object>;

const columns = [
  {
    // Make an expander cell
    Header: () => null, // No header
    id: 'expander', // It needs an ID
    Cell: ({ row }: { row: ExpandableRow }) => (
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

function MySubTable({ data }: { data: any }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: subColumns,
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
        {rows.map((row) => {
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

export function MyTable({ data }: { data: any }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
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
        {rows.map((row: any) => {
          prepareRow(row);
          return (
            <React.Fragment>
              <Table.Row>
                {row.cells.map((cell: any) => {
                  return (
                    <Table.Cell {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </Table.Cell>
                  );
                })}
              </Table.Row>
              {row.isExpanded ? (
                <Table.Row>
                  <Table.Cell colSpan={visibleColumns.length}>
                    {renderRowSubComponent({ row })}
                  </Table.Cell>
                </Table.Row>
              ) : undefined}
            </React.Fragment>
          );
        })}
      </Table.Body>
    </Table>
  );
}

function renderRowSubComponent({ row }: { row: any }) {
  if (row.original.tickets) {
    return <MySubTable data={row.original.tickets} />;
  }
  return <Message color="orange">Ticket listings unavailable</Message>;
}
