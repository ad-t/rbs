/*
 * This file will handle the entire landing page.
 */
import React from 'react';

// Import icons
import { FaPlus, FaMinus } from 'react-icons/fa';

// Import our interface
import { ITicket } from '../../../types/tickets';

export default class Ticket extends React.Component<{
  cost: number,
  description: string,
  minPurchase: number
}, {
  ticketSales: number
}> {
  state = { ticketSales: 0 };

  modifyTicket = (value: number) => {
    // Modify the ticket sales by a value
    const { minPurchase } = this.props;
    let { ticketSales } = this.state;

    ticketSales += value;
    if (ticketSales < minPurchase) {
      if (value > 0)
        ticketSales = minPurchase
      else
        ticketSales = 0;
    }

    this.setState({ ticketSales });
  }

  render() {
    const { cost, description } = this.props;
    const { ticketSales } = this.state;

    return (
      <div className="flex items-center mv3">
        <div className="w-10 mr3">${cost}</div>
        <div className="w-70">{description}</div>
        <div className="flex items-center justify-between w-25">
          <button
            className="btn-rbs-modifier bn flex items-center justify-center br-100"
            disabled={ticketSales <= 0}
            onClick={() => this.modifyTicket(-1)}
          ><FaMinus /></button>
          <div className="f4 pa1" style={{width: 22}}>{ticketSales}</div>
          <button
            className="btn-rbs-modifier bn flex items-center justify-center br-100"
            onClick={() => this.modifyTicket(1)}
          ><FaPlus /></button>
        </div>
      </div>
    );
  }
};
