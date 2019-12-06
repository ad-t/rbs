/*
 * This file will handle the entire landing page.
 */
import React from 'react';
import { Button } from 'semantic-ui-react';

interface Props {
  index: number;
  cost: number;
  description: string;
  minPurchase: number;
  updateAmount(index: number, amount: number): void;
};

interface State {
  ticketSales: number
}

export default class Ticket extends React.Component<Props, State> {
  state = { ticketSales: 0 };

  modifyTicket = (value: number) => {
    // Modify the ticket sales by a value
    const { index, minPurchase } = this.props;
    let { ticketSales } = this.state;

    ticketSales += value;
    if (ticketSales < minPurchase) {
      if (value > 0)
        ticketSales = minPurchase
      else
        ticketSales = 0;
    }

    this.props.updateAmount(index, ticketSales);
    this.setState({ ticketSales });
  }

  render() {
    const { cost, description } = this.props;
    const { ticketSales } = this.state;

    return (
      <div className="ticket-item">
        <div className="cost">${cost}</div>
        <div className="desc">{description}</div>
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
            onClick={() => this.modifyTicket(1)}
            icon="plus"
            positive
          ></Button>
        </div>
      </div>
    );
  }
};
