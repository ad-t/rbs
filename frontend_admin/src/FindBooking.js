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
  Table,
  Message
} from 'semantic-ui-react'
import AdminNavbar from './Layouts/AdminNavbar'
import AdminFooter from './Layouts/AdminFooter'

class FindBooking extends React.Component {
  state = {
    tickets: [],
    inputMethod: 'id',
    search: '',
    submittedSearch: '',
    showId: 2
  }
  handleChange = (e, { value }) => this.setState({ inputMethod: value })

  searchChange = (e, { value }) => this.setState({ search: value });

  onSubmit = e => {
    //if (this.state.search !== this.state.submittedSearch) {
      this.fetchTickets(this.state.search);
      this.setState({ submittedSearch: this.state.search });
    //}
  }

  async fetchTickets(ticketId: string) {
    // TODO: use proper ID
    const showRes = await fetch(`${process.env.REACT_APP_API_URL}/admin/tickets/${ticketId}`, {credentials: 'include'});

    if (showRes.status === 200) {
      const data = await showRes.json();
      this.setState({tickets: data});
    } else if (showRes.status === 404) {
      // TODO: should this return 200 and an empty array anyway?

    }
  }

  render() {
    const {tickets, inputMethod, search, submittedSearch} = this.state;

    const searchResults = tickets && tickets.length ? (
      /* TODO: make sortable */
      /*<Message color='orange'>Search results not implemented yet!</Message>*/
      <Table celled>
      <Table.Header>
          <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Checked in?</Table.HeaderCell>
          </Table.Row>
      </Table.Header>
      <Table.Body>
        {tickets.map(a =>
          <Table.Row>
            <Table.Cell>{a.id}</Table.Cell>
            <Table.Cell>{a.checkInTime}</Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
      </Table>

    ) : (
      <Segment>
        Enter a ticket to get started
      </Segment>
    );

    let entryInput;
    if (inputMethod === 'qr') {
      entryInput = <Message color='orange'>QR Code not implemented yet!</Message>;
    } else {
      entryInput = (
        <Form onSubmit={this.onSubmit}>
          <Form.Input icon={{ name: 'search', circular: true, link: true, onClick: this.onSubmit }}
            value={search} placeholder='Ticket ID...' onChange={this.searchChange} />
        </Form>
      );
    }

    return (
      <React.Fragment>
        <AdminNavbar />

        <Container text style={{ marginTop: '7em' }}>
          <Header as='h1'>Check In Ticket</Header>

          <p>Find by:</p>
          <Form>
          {/*
          <Form.Field>
            Selected value: <b>{this.state.value}</b>
          </Form.Field>
          */}
          <Form.Field>
            <Radio
              label='Ticket ID'
              name='radioGroup'
              value='id'
              checked={inputMethod === 'id'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='QR Code'
              name='radioGroup'
              value='qr'
              checked={inputMethod === 'qr'}
              onChange={this.handleChange}
            />
          </Form.Field>
        </Form>

        <div style={{ marginTop: '0.8em' }}>
          {entryInput}
        </div>

        {searchResults}
        </Container>

        <AdminFooter />
      </React.Fragment>
    );
  }
}

export default FindBooking
