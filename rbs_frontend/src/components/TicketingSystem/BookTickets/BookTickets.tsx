/*
 * This file will handle the entire landing page.
 */
import React from "react";
import { Button, Divider, List, Message } from "semantic-ui-react";
import currency from "currency.js";

// Import our custom element
import Ticket from "../Ticket";

// Import our interface
import { ITicket, ITicketDetails } from "../../../types/tickets";

interface Prop {
  selectedShow: number;
  tickets: ITicket[];
  ticketDetails: ITicketDetails[];
  updateTickets(tickets: ITicket[]): void;
  updateTicketDetails(tickets: ITicketDetails[]): void;
  next(): void;
}

interface State {};

export default class BookTickets extends React.Component<Prop, State> {
  state = {};

  componentDidMount = () => {
    if (this.props.tickets.length === 0) {
      this.loadTickets();
    }
  }

  componentDidUpdate = () => {
    if (this.props.tickets.length === 0) {
      this.loadTickets();
    }
  }

  loadTickets = async () => {
    const { selectedShow } = this.props;
    const res = await fetch(`${process.env.REACT_APP_API_URL}/shows/${selectedShow}`);
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
  }

  updateAmount = (index: number, amount: number) => {
    const tickets = [ ...this.props.tickets ];
    if (!tickets[index]) return;
    const ticket: ITicket = { ...tickets[index] };
    ticket.quantity = amount;
    tickets[index] = ticket;
    this.props.updateTickets(tickets);
  }

  reserveTickets = () => {
    const {tickets, ticketDetails: oldTicketDetails } = this.props;

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
        const currDetails : ITicketDetails = {
          typeId: ticketType.id,
//           name: "Jane Doe",
          name: "",
          phone: "",
//           postcode: "0000",
          postcode: "",
          seatNum: ""
        };
        ticketDetails.push(currDetails);
      }
    }

    // sort should be stable.
    ticketDetails.sort((a, b) => (a.typeId - b.typeId));
    this.props.updateTicketDetails(ticketDetails);
    this.props.next();
  }

  render() {
    const { tickets } = this.props;
    const ticketElms: Array<JSX.Element> = [];
    let totalPrice = currency(0);
    let totalQuantity = 0;

    for (let ticket of tickets) {
      totalQuantity += ticket.quantity;
    }

    console.log(tickets);
    for (let i = 0; i < tickets.length; ++i) {
      const ticket: ITicket = tickets[i];
      ticketElms.push(
        <Ticket
          key={i}
          index={i}
          cost={ticket.price}
          quantity={ticket.quantity}
          description={ticket.description}
          minPurchase={ticket.minPurchaseAmount}
          totalTickets={totalQuantity}
          updateAmount={this.updateAmount}
        />
      );
      totalPrice = totalPrice.add(currency(ticket.price).multiply(ticket.quantity));
    }

    const groupTicketsSelected = tickets.some(a => /group/i.test(a.description) && a.quantity > 0);
    const notEnoughGroupTickets = totalQuantity < 4 && groupTicketsSelected;
    const doNotProceed = totalPrice.value <= 0 || notEnoughGroupTickets;

    return (
      <div>
        <div style={{margin: "1em 1em"}}>
          <p><strong>Note:</strong> A Handling Fee of $2.19 per transaction applies.</p>
          <p>Maximum 10 tickets per transaction. For groups &gt;10, please split bookings into two :)</p>
          <p>Book <strong>four or more tickets</strong> (Arc or General) in one transaction and save!</p>
        </div>
        <div className="tickets-list">
          {ticketElms}
        </div>
        <Divider style={{margin: "0em 1em"}}/>
        <div className="ticket-price">Subtotal: {totalPrice.format()}</div>
        {notEnoughGroupTickets ? <Message color="red">Total minimum of 4 tickets required for group prices.</Message> : null}
        <div className="btn-controls">
          <Button
            primary
            onClick={this.reserveTickets}
            disabled={doNotProceed}
          >RESERVE TICKETS</Button>
        </div>
      </div>
    );
  }
};
