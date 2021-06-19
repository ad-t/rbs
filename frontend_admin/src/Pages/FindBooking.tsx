import React from 'react';
import {
  Container,
  Header,
  Segment,
  Form,
  Radio,
  Table,
  Message,
  Button,
  CheckboxProps,
  InputOnChangeData,
} from 'semantic-ui-react';
import { installTickets } from 'src/Api/installTickets';
import { Ticket } from 'src/shared/types';
import dayjs from 'dayjs';
import QrReader from 'react-qr-reader';

interface State {
  tickets: Ticket[];
  inputMethod: string;
  search: string;
  submittedSearch: string;
  hasScanned: boolean;
}

class FindBooking extends React.Component<{}, State> {
  state = {
    tickets: [] as Ticket[],
    inputMethod: 'id',
    search: '',
    submittedSearch: '',
    showId: 2,
    hasScanned: false,
  };

  handleChange = (
    e: React.FormEvent<HTMLInputElement>,
    { value }: CheckboxProps
  ) => this.setState({ inputMethod: value?.toString() || '' });

  searchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { value }: InputOnChangeData
  ) => this.setState({ search: value });

  onSubmitTicketId = (e: React.FormEvent<HTMLFormElement>) => {
    //if (this.state.search !== this.state.submittedSearch) {
    this.fetchTickets(this.state.search);

    this.setState({ submittedSearch: this.state.search });
    //}
  };

  onSubmitOrderId = (e: React.FormEvent<HTMLFormElement>) => {
    this.fetchOrder(this.state.search);
    this.setState({ submittedSearch: this.state.search });
  };

  handleScan = (data: string | null) => {
    if (
      data &&
      /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(
        data
      )
    ) {
      this.fetchTickets(data);
      this.setState({ hasScanned: true, search: data, submittedSearch: data });
    }
  };

  async checkIn(ticketId: string) {
    // TODO: use proper ID
    const showRes = await fetch(
      `${process.env.REACT_APP_API_URL}/admin/tickets/${ticketId}/check-in`,
      { method: 'POST', credentials: 'include' }
    );

    if (showRes.status === 200) {
      if (this.state.inputMethod === 'order_id') {
        await this.fetchOrder(this.state.submittedSearch);
      } else {
        await this.fetchTickets(ticketId);
      }
    }
  }

  async reverseCheckIn(ticketId: string) {
    // TODO: use proper ID
    const showRes = await fetch(
      `${process.env.REACT_APP_API_URL}/admin/tickets/${ticketId}/check-in-reverse`,
      { method: 'POST', credentials: 'include' }
    );

    if (showRes.status === 200) {
      if (this.state.inputMethod === 'order_id') {
        await this.fetchOrder(this.state.submittedSearch);
      } else {
        await this.fetchTickets(ticketId);
      }
    }
  }

  async fetchTickets(ticketId: string) {
    const data = await installTickets(ticketId);
    this.setState({ tickets: data });
  }

  async fetchOrder(orderId: string) {
    // TODO: use proper ID
    const showRes = await fetch(
      `${process.env.REACT_APP_API_URL}/admin/order/${orderId}`,
      { credentials: 'include' }
    );

    if (showRes.status === 200) {
      const data = await showRes.json();
      this.setState({ tickets: data.tickets });
    } else if (showRes.status === 404) {
      // TODO: should this return 200 and an empty array anyway?
      this.setState({ tickets: [] });
    }
  }

  render() {
    const { tickets, inputMethod, search, submittedSearch } = this.state;

    const searchResults =
      tickets && tickets.length ? (
        /* TODO: make sortable */
        /*<Message color='orange'>Search results not implemented yet!</Message>*/
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Ticket ID</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Seat num</Table.HeaderCell>
              <Table.HeaderCell>Checked in?</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tickets.map((a) => (
              <Table.Row key={a.id}>
                <Table.Cell>{a.id}</Table.Cell>
                <Table.Cell>{a.name}</Table.Cell>
                <Table.Cell>{a.seat ? 'a.seat.seatNum' : '???'}</Table.Cell>
                <Table.Cell>
                  {a.checkInTime
                    ? dayjs(a.checkInTime).format('ddd DD MMM YYYY HH:mm:ss')
                    : 'no'}
                </Table.Cell>
                <Table.Cell>
                  {a.checkInTime ? (
                    <Button onClick={() => this.reverseCheckIn(a.id)}>
                      Reverse
                    </Button>
                  ) : (
                    <Button primary onClick={() => this.checkIn(a.id)}>
                      Check In
                    </Button>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : inputMethod === 'qr' && this.state.hasScanned ? (
        <Message color="orange">Ticket {submittedSearch} not found</Message>
      ) : (
        <Segment>Enter a ticket to get started</Segment>
      );

    let entryInput;
    if (inputMethod === 'qr') {
      entryInput = (
        <div>
          <QrReader
            delay={300}
            onError={() => {
              // TODO: Add tests
            }}
            onScan={this.handleScan}
            style={{ width: '100%' }}
          />
        </div>
      );
    } else if (inputMethod === 'order_id') {
      entryInput = (
        <Form onSubmit={this.onSubmitOrderId}>
          <Form.Input
            icon={{
              name: 'search',
              circular: true,
              link: true,
              onClick: this.onSubmitOrderId,
            }}
            value={search}
            placeholder="Order ID..."
            onChange={this.searchChange}
          />
        </Form>
      );
    } else {
      entryInput = (
        <Form onSubmit={this.onSubmitTicketId}>
          <Form.Input
            icon={{
              name: 'search',
              circular: true,
              link: true,
              onClick: this.onSubmitTicketId,
            }}
            value={search}
            placeholder="Ticket ID..."
            onChange={this.searchChange}
          />
        </Form>
      );
    }

    return (
      <Container text style={{ marginTop: '7em' }}>
        <Header as="h1">Check In Ticket</Header>

        <p>Find by:</p>
        <Form>
          <Form.Field>
            <Radio
              label="Ticket ID"
              name="radioGroup"
              value="id"
              checked={inputMethod === 'id'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="Order ID"
              name="radioGroup"
              value="order_id"
              checked={inputMethod === 'order_id'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="QR Code"
              name="radioGroup"
              value="qr"
              checked={inputMethod === 'qr'}
              onChange={this.handleChange}
            />
          </Form.Field>
        </Form>

        <div style={{ marginTop: '0.8em' }}>{entryInput}</div>

        {searchResults}
      </Container>
    );
  }
}

export default FindBooking;
