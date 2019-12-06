/*
 * This file will handle the entire landing page.
 */
import React from 'react';
import { Button } from 'semantic-ui-react';

// Import our custom element
import Ticket from '../Ticket';

// Import our interface
import { ITicket } from '../../../types/tickets';

interface Prop {
  selectedShow: number
}
interface State {
  tickets: Array<ITicket>
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
    const res = await fetch(`http://localhost:5000/shows/${selectedShow}`);
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      this.setState({ tickets: data.ticketTypes });
    }
  }

  render() {
    const { tickets } = this.state;
    const ticketElms: Array<JSX.Element> = [];

    for (let i = 0; i < tickets.length; ++i) {
      const ticket: ITicket = tickets[i];
      ticketElms.push(
        <Ticket
          key={i}
          cost={ticket.price}
          description={ticket.description}
          minPurchase={ticket.minPurchaseAmount}
        />
      );
    }

    return (
      <div>
        <div className="tickets-list">
          {ticketElms}
        </div>
        <div className="btn-controls">
          <Button primary>PURCHASE TICKETS</Button>
        </div>
      </div>
    );
  }
};
