/*
 * This file will handle the entire landing page.
 */
import React from 'react';

// Import our custom element
import Ticket from '../Ticket';

// Import our interface
import { ITicket } from '../../../types/tickets';

interface TSState {
  tickets: Array<ITicket>
};

export default class BookTickets extends React.Component<{}, TSState> {
  state = {
    tickets: []
  }

  componentDidMount = () => {
    this.loadTickets();
  }

  loadTickets = () => {
    /*
      TODO: add the ability to read from the backend the ticketing information
    */
    const tickets = [
     {
      id: 1,
      cost: 10,
      description: 'ARC - INDIVIDUAL',
      minPurchase: 0,
      quantity: 0
     },
     {
      id: 2,
      cost: 10,
      description: 'ARC - GROUP',
      minPurchase: 5,
      quantity: 0
    },
    {
      id: 3,
      cost: 12,
      description: 'GENERAL - INDIVIDUAL',
      minPurchase: 0,
      quantity: 0
    },
    {
      id: 4,
      cost: 10,
      description: 'GENERAL - GROUP',
      minPurchase: 5,
      quantity: 0
    },
   ];

   this.setState({ tickets });
  }

  render() {
    const { tickets } = this.state;
    const ticketElms: Array<JSX.Element> = [];

    for (let i = 0; i < tickets.length; ++i) {
      const ticket: ITicket = tickets[i];
      ticketElms.push(
        <Ticket
          key={i}
          cost={ticket.cost}
          description={ticket.description}
          minPurchase={ticket.minPurchase}
        />
      );
    }

    return (
      <div className="rbs-flex-grow-1 flex flex-column pv2 ph3">
        <div className="flex items-center mv3">
          <span className="rbs-circled-number mr2">1</span>
          <span className="b f3 lh-title">BOOK TICKETS</span>
        </div>
        <div className="rbs-flex-grow-1 flex flex-column justify-between">
          <div>
            {ticketElms}
          </div>
          <div>
            <button className="rbs-btn b bn mb2 pa2 w-100">PURCHASE TICKETS</button>
          </div>
        </div>
      </div>
    );
  }
};
