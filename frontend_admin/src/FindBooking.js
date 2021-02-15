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
import AdminNavbar from './Layouts/AdminNavbar'
import AdminFooter from './Layouts/AdminFooter'

class FindBooking extends React.Component {
  state = {
    data: []
  }
  handleChange = (e, { value }) => this.setState({ value })

  async componentDidMount() {
    // TODO: use proper ID
    const showRes = await fetch(`${process.env.REACT_APP_API_URL}/admin/shows/2/tickets`);

    if (showRes.status === 200) {
      const data = await showRes.json();
      this.setState({data: data});
    }
  }


  render() {
    const {data} = this.state;

    return (
      <div>
        <AdminNavbar />

        <Container text style={{ marginTop: '7em' }}>
          <Header as='h1'>Find Booking</Header>

          <p>Find by:</p>
          <Form>
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
              checked={this.state.value === 'name'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Email'
              name='radioGroup'
              value='email'
              checked={this.state.value === 'email'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Phone'
              name='radioGroup'
              value='phone'
              checked={this.state.value === 'phone'}
              onChange={this.handleChange}
            />
          </Form.Field>
        </Form>

        {/* TODO: make sortable */}
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Number of Seats</Table.HeaderCell>
              <Table.HeaderCell>Amount Paid</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.map(({name, numSeats, subtotalPrice}) => (
              <Table.Row>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>{numSeats}</Table.Cell>
                <Table.Cell>${(subtotalPrice / 100).toFixed(2)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        </Container>

        <AdminFooter />
      </div>
    );
  }
}

export default FindBooking
