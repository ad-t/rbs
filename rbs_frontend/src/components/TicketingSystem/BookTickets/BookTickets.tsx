/*
 * This file will handle the entire landing page.
 */
import React from 'react';
import {
  Button,
  Divider,
  List,
  Message,
  Form,
  InputOnChangeData,
} from 'semantic-ui-react';
import currency from 'currency.js';

// Import our custom element
import { createTicket } from 'src/components/Ticket/create';

// Import our interface
import { ITicket, ITicketDetails } from '../../../types/tickets';
import { IDiscount } from '../../../types/discount';

interface Prop {
  selectedShow: number;
  tickets: ITicket[];
  ticketDetails: ITicketDetails[];
  discount: IDiscount | null;
  updateTickets(tickets: ITicket[]): void;
  updateTicketDetails(tickets: ITicketDetails[]): void;
  updateDiscount(discount: IDiscount | null): void;
  next(): void;
}

interface State {
  voucherCode: string;
  discountEntered: boolean;
}

export default class BookTickets extends React.Component<Prop, State> {
  state = {
    voucherCode: '',
    discountEntered: false,
  };

  componentDidMount = () => {
    if (this.props.tickets.length === 0) {
      this.loadTickets();
    }
  };

  componentDidUpdate = () => {
    if (this.props.tickets.length === 0) {
      this.loadTickets();
    }
  };

  loadTickets = async () => {
    const { selectedShow } = this.props;
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/shows/${selectedShow}`
    );
    if (res.status === 200) {
      const data = await res.json();
      for (let i = 0; i < data.ticketTypes.length; ++i) {
        data.ticketTypes[i].quantity = 0;
      }
      // On backend ticket prices are stored as cents.
      for (let i = 0; i < data.ticketTypes.length; ++i) {
        data.ticketTypes[i].price /= 100;
      }
      this.props.updateTickets(data.ticketTypes);
    }
  };

  updateAmount = (index: number, amount: number) => {
    const tickets = [...this.props.tickets];
    if (!tickets[index]) return;
    const ticket: ITicket = { ...tickets[index] };
    ticket.quantity = amount;
    tickets[index] = ticket;
    this.props.updateTickets(tickets);
  };

  reserveTickets = () => {
    const { tickets, ticketDetails: oldTicketDetails } = this.props;

    const ticketDetails: ITicketDetails[] = [];
    for (const ticketType of tickets) {
      // Ensure num of details fields match the quantity requested.
      let i = 0;
      for (const t of oldTicketDetails) {
        if (i >= ticketType.quantity) break;
        if (t.typeId === ticketType.id) {
          ticketDetails.push(t);
          i++;
        }
      }
      for (; i < ticketType.quantity; ++i) {
        const currDetails: ITicketDetails = {
          typeId: ticketType.id,
          //           name: "Jane Doe",
          name: '',
          phone: '',
          //           postcode: "0000",
          postcode: '',
          seatNum: '',
        };
        ticketDetails.push(currDetails);
      }
    }

    // sort should be stable.
    ticketDetails.sort((a, b) => a.typeId - b.typeId);
    this.props.updateTicketDetails(ticketDetails);
    this.props.next();
  };

  handleVoucherChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    this.setState({ voucherCode: data.value });
  };

  validateVoucherCode = async () => {
    this.setState({ discountEntered: true });

    if (!/^[A-Za-z0-9]{4,}$/.test(this.state.voucherCode)) {
      this.props.updateDiscount(null);
      return;
    }

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/validate-discount?code=${this.state.voucherCode}&showId=${this.props.selectedShow}`
    );

    if (res.ok) {
      const data = await res.json();
      this.props.updateDiscount(data.discount);
    } else {
      this.props.updateDiscount(null);
    }
  };

  render() {
    const { tickets, discount } = this.props;
    const { discountEntered } = this.state;
    const ticketElms: Array<JSX.Element> = [];
    let totalPrice = currency(0);
    let totalQuantity = 0;

    for (const ticket of tickets) {
      totalQuantity += ticket.quantity;
    }

    console.log(tickets);
    for (let i = 0; i < tickets.length; ++i) {
      const ticket: ITicket = tickets[i];

      const { Ticket, ticketState } = createTicket({
        id: i.toString(),
        initialAmount: 0,
        name: ticket.description,
        cost: ticket.price,
        minPurchase: ticket.minPurchaseAmount,
      });

      ticketElms.push(<Ticket />);
      totalPrice = totalPrice.add(
        currency(ticket.price).multiply(ticket.quantity)
      );
    }

    const minGroupSize = this.props.discount?.minGroupSize || 4;
    const groupTicketsSelected = tickets.some(
      (a) => /group/i.test(a.description) && a.quantity > 0
    );
    const notEnoughGroupTickets =
      totalQuantity < minGroupSize && groupTicketsSelected;
    const doNotProceed = totalPrice.value <= 0 || notEnoughGroupTickets;

    return (
      <div>
        <div style={{ margin: '1em 1em' }}>
          <p>
            <strong>Note:</strong> A Handling Fee of $2.19 per transaction
            applies.
          </p>
          <p>
            Maximum 10 tickets per transaction. For groups &gt;10, please split
            bookings into two :)
          </p>
          <p>
            Book <strong>four or more tickets</strong> (Arc or General) in one
            transaction and save!
          </p>
        </div>
        <div className="tickets-list">{ticketElms}</div>
        <Divider style={{ margin: '0em 1em' }} />
        <div className="ticket-price">Subtotal: {totalPrice.format()}</div>
        <div className="ticket-price">
          <Form
            onSubmit={this.validateVoucherCode}
            error={discountEntered && !discount}
            success={!!discount}
          >
            <Form.Input
              name="voucherCode"
              value={this.state.voucherCode}
              onChange={this.handleVoucherChange}
            />
            <Form.Button>Validate Code</Form.Button>
            <Message error color="red">
              Discount code is invalid or not for this show night
            </Message>
            <Message success>
              <strong>{discount?.name}:</strong> {discount?.message}
            </Message>
          </Form>
        </div>
        {notEnoughGroupTickets ? (
          <Message color="red">
            Total minimum of 4 tickets required for group prices.
          </Message>
        ) : null}
        <div className="btn-controls">
          <Button
            primary
            fluid
            onClick={this.reserveTickets}
            disabled={doNotProceed}
          >
            RESERVE TICKETS
          </Button>
        </div>
      </div>
    );
  }
}
