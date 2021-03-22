import React from 'react'
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
  Form,
  Radio,
  Table
} from 'semantic-ui-react'
 import { useTable } from 'react-table'
//import { QuickScore } from "quick-score";
import Fuse from 'fuse.js';
import AdminNavbar from './Layouts/AdminNavbar'
import AdminFooter from './Layouts/AdminFooter'

const columns = [{
  Header: 'Name',
  accessor: 'name', // accessor is the "key" in the data
}, {
  Header: 'Num Seats',
  accessor: 'numSeats',
}, {
  Header: 'Email',
  accessor: 'email',
}, {
  Header: 'Phone',
  accessor: 'phone'
}, {
  Header: 'Amount Paid',
  accessor: 'subtotalPrice',
  // TODO: use a proper currency thing
  Cell: props => `$${(props.value / 100).toFixed(2)}`
}];

// react-table only works with functional components.
function MyTable({data, columns}) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
     <Table celled {...getTableProps()}>
      <Table.Header>

        {headerGroups.map(headerGroup => (
          <Table.Row {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <Table.HeaderCell {...column.getHeaderProps()}>{column.render('Header')}</Table.HeaderCell>
            ))}
          </Table.Row>
        ))}
      </Table.Header>
      <Table.Body {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <Table.Row {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <Table.Cell {...cell.getCellProps()}>{cell.render('Cell')}</Table.Cell>
              })}
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  );
}

// TODO: evaluate if we really need this
const searchTypeToCol = {
  name: 'name',
  email: 'email',
  phone: 'phone'
};

class FindBooking extends React.Component {
  state = {
    data: [],
    searchType: 'name',
    search: ''
  }
  searchChange = (e, { value }) => this.setState({ search: value });
  handleChange = (e, { value }) => this.setState({ searchType: value });

  async componentDidMount() {
    // TODO: use proper ID
    const showRes = await fetch(`${process.env.REACT_APP_API_URL}/admin/shows/2/tickets`);

    if (showRes.status === 200) {
      const data = await showRes.json();
      this.setState({data: data});
    }
  }

  render() {
    const {data, searchType, search } = this.state;

    // TODO: check if react-table filter will do a better job
    const fuse = new Fuse(data, { keys: [ searchTypeToCol[searchType] ] });
    // Display all results if no search string.
    const filteredData = search ? fuse.search(search).map(a => a.item) : data;

    return (
      <React.Fragment>
        <AdminNavbar />

        <Container style={{ marginTop: '7em' }}>
          <Header as='h1'>Find Booking</Header>

          <p>Find by:</p>
          <Form onSubmit={this.onSubmit}>
          {/*
          <Form.Field>
            Selected value: <b>{this.state.value}</b>
          </Form.Field>
          */}
          <Form.Field>
            <Radio
              label='Name'
              name='radioGroup'
              value='name'
              checked={searchType === 'name'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Email'
              name='radioGroup'
              value='email'
              checked={searchType === 'email'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Phone'
              name='radioGroup'
              value='phone'
              checked={searchType === 'phone'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Input icon={{ name: 'search', circular: true, link: true }}
            value={search} placeholder='Search...' onChange={this.searchChange} />
        </Form>

        {/* TODO: make sortable */}
        <MyTable data={filteredData} columns={columns} />
        </Container>

        <AdminFooter />
      </React.Fragment>
    );
  }
}

export default FindBooking
