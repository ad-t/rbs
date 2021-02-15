/*
 * This file will handle the entire landing page.
 */
import React from 'react';
import { Button, Divider, List } from 'semantic-ui-react';

// Import our custom element
import Ticket from '../Ticket';

// Import our interface
import { ITicket } from '../../../types/tickets';

interface Prop {
  selectedShow: number;
  updateTickets(tickets: Array<ITicket>): void;
}
interface State {
  tickets: Array<ITicket>;
};

export default class BookTickets extends React.Component<Prop, State> {
  state = {
    tickets: []
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
        <div className="tickets-list">
          {ticketElms}
        </div>
        <Divider style={{margin: '0em 1em'}}/>
        <div className="ticket-price">Total Cost: ${totalPrice}</div>
        <div className="btn-controls">
          <Button
            primary
            onClick={() => this.props.updateTickets(tickets)}
            disabled={totalPrice === 0}
          >RESERVE TICKETS</Button>
        </div>
      </div>
    );
  }
};
