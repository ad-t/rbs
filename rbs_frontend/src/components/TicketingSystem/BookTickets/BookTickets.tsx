/*
 * This file will handle the entire landing page.
 */
import React from 'react';
import { Button, Divider, List } from 'semantic-ui-react';

// Import our custom element
import Ticket from '../Ticket';

// Import our interface
import { ITicket, ITicketDetails } from '../../../types/tickets';

interface Prop {
  selectedShow: number;
  updateTickets(tickets: Array<ITicket>): void;
}

interface State {
  tickets: Array<ITicket>;
};

export default class BookTickets extends React.Component<Prop, State> {
  state = {
    // FIXME: figure out why this requires the 'as'
    tickets: [] as Array<ITicket>
  }

  componentDidMount = () => {
    this.loadTickets();
  }

  loadTickets = async () => {
    const { selectedShow } = this.props;
    const res = await fetch(`${process.env.REACT_APP_API_URL}/shows/${selectedShow}`);
    if (res.status === 200) {
      const data = await res.json();
      for (let i = 0; i < data.ticketTypes.length; ++i) {
        data.ticketTypes[i].quantity = 0;
        data.ticketTypes[i].details = [];
      }
      // On backend ticket prices are stored as cents.
      for (let i = 0; i < data.ticketTypes.length; ++i) {
        data.ticketTypes[i].price /= 100;
      }
      this.setState({ tickets: data.ticketTypes });
    }
  }

  updateAmount = (index: number, amount: number) => {
    const { tickets } = this.state;
    const ticket: ITicket = tickets[index];

    if (ticket) {
      ticket.quantity = amount;
      this.setState({ tickets });
    }
  }

  reserveTickets = () => {
    const {tickets} = this.state;

    for (const t of tickets) {
      // Ensure num of details fields match the quantity requested.
      // TODO: remove when quantity < details.length
      while (t.details.length < t.quantity) {
        const currDetails : ITicketDetails = {
          name: "Jane Doe",
          phone: "",
          postcode: "0000"
        };
        t.details.push(currDetails);
      }
    }

    this.props.updateTickets(tickets);
  }


  render() {
    const { tickets } = this.state;
    const ticketElms: Array<JSX.Element> = [];
    let totalPrice = 0;

    for (let i = 0; i < tickets.length; ++i) {
      const ticket: ITicket = tickets[i];
      ticketElms.push(
        <Ticket
          key={i}
          index={i}
          cost={ticket.price}
          description={ticket.description}
          minPurchase={ticket.minPurchaseAmount}
          updateAmount={this.updateAmount}
        />
      );
      totalPrice += (ticket.quantity * ticket.price);
    }

    return (
      <div>
        <p style={{margin: '0.5em 1em'}}><strong>Note:</strong> A Handling Fee of $1.69 per transaction applies.</p>
        <div className="tickets-list">
          {ticketElms}
        </div>
        <Divider style={{margin: '0em 1em'}}/>
        <div className="ticket-price">Total Cost: ${totalPrice}</div>
        <div className="btn-controls">
          <Button
            primary
            onClick={this.reserveTickets}
            disabled={totalPrice === 0}
          >RESERVE TICKETS</Button>
        </div>
      </div>
    );
  }
};
