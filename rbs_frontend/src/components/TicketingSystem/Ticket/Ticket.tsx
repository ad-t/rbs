/*
 * This file will handle the entire landing page.
 */
import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

interface Props {
  index: number;
  cost: number;
  description: string;
  quantity: number;
  minPurchase: number;
  totalTickets: number;
  updateAmount(index: number, amount: number): void;
};

export default class Ticket extends React.Component<Props, {}> {
  modifyTicket = (value: number) => {
    // Modify the ticket sales by a value
    const { index, minPurchase } = this.props;
    let ticketSales = this.props.quantity;

    ticketSales += value;
    if (ticketSales < minPurchase) {
      if (value > 0)
        ticketSales = minPurchase
      else
        ticketSales = 0;
    }

    this.props.updateAmount(index, ticketSales);
  }

  render() {
    const { cost, description, quantity: ticketSales, totalTickets } = this.props;

    return (
      <div className="ticket-item">
        <div className="ticket-logo"><Icon name='ticket' size='large'/></div>
        <div className="ticket-desc">
          ${cost} - {description}
        </div>
        <div className="controls">
          <Button
            className="decrement"
            circular
            disabled={ticketSales <= 0}
            onClick={() => this.modifyTicket(-1)}
            icon="minus"
            negative
          ></Button>
          <div className="ticket-numbers">{ticketSales}</div>
          <Button
            className="increment"
            circular
            disabled={totalTickets >= 10}
            onClick={() => this.modifyTicket(1)}
            icon="plus"
            positive
          ></Button>
        </div>
      </div>
    );
  }
};
