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
  Message,
  Button
} from 'semantic-ui-react'
import AdminNavbar from './Layouts/AdminNavbar'
import AdminFooter from './Layouts/AdminFooter'
import dayjs from 'dayjs';
import QrReader from 'react-qr-reader';

class FindBooking extends React.Component {
  state = {
    tickets: [],
    inputMethod: 'id',
    search: '',
    submittedSearch: '',
    showId: 2,
    hasScanned: false
  }
  handleChange = (e, { value }) => this.setState({ inputMethod: value })

  searchChange = (e, { value }) => this.setState({ search: value });

  onSubmit = e => {
    //if (this.state.search !== this.state.submittedSearch) {
      this.fetchTickets(this.state.search);
      this.setState({ submittedSearch: this.state.search });
    //}
  }

  handleScan = s => {
    if (/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(s)) {
      this.fetchTickets(s);
      this.setState({ hasScanned: true, search: s, submittedSearch: s });
    }
  }

  handleScanError = e => {

  }

  async checkIn(ticketId: string) {
    // TODO: use proper ID
    const showRes = await fetch(`${process.env.REACT_APP_API_URL}/admin/tickets/${ticketId}/check-in`, {method: 'POST', credentials: 'include'});

    if (showRes.status === 200) {
      await this.fetchTickets(ticketId);
    }
  }

  async reverseCheckIn(ticketId: string) {
    // TODO: use proper ID
    const showRes = await fetch(`${process.env.REACT_APP_API_URL}/admin/tickets/${ticketId}/check-in-reverse`, {method: 'POST', credentials: 'include'});

    if (showRes.status === 200) {
      await this.fetchTickets(ticketId);
    }
  }

  async fetchTickets(ticketId: string) {
    // TODO: use proper ID
    const showRes = await fetch(`${process.env.REACT_APP_API_URL}/admin/tickets/${ticketId}`, {credentials: 'include'});

    if (showRes.status === 200) {
      const data = await showRes.json();
      this.setState({tickets: data});
    } else if (showRes.status === 404) {
      // TODO: should this return 200 and an empty array anyway?
      this.setState({tickets: []});
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
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Seat num</Table.HeaderCell>
              <Table.HeaderCell>Checked in?</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
      </Table.Header>
      <Table.Body>
        {tickets.map(a =>
          <Table.Row key={a.id}>
            <Table.Cell>{a.id}</Table.Cell>
            <Table.Cell>{a.name}</Table.Cell>
            <Table.Cell>{a.seat ? a.seat.seatNum : '???'}</Table.Cell>
            <Table.Cell>{a.checkInTime ? dayjs(a.checkInTime).format('ddd DD MMM YYYY hh:mm:ss') : "no"}</Table.Cell>
            <Table.Cell>
              {a.checkInTime ?
              <Button onClick={() => this.reverseCheckIn(a.id)}>Reverse</Button>
              :
              <Button primary onClick={() => this.checkIn(a.id)}>Check In</Button>
              }
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
      </Table>

    ) : inputMethod === 'qr' && this.state.hasScanned ? (
      <Message color='orange'>Ticket {submittedSearch} not found</Message>
    ) : (
      <Segment>
        Enter a ticket to get started
      </Segment>
    );

    let entryInput;
    if (inputMethod === 'qr') {
      entryInput = <div>
        <QrReader
          delay={300}
          onError={this.handleScanError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
        />
      </div>;
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
