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
};

interface State {};

export default class Ticket extends React.Component<Props, State> {
  render() {
    const { cost, description, quantity } = this.props;

    return (
      <div className="ticket-item">
        <div className="ticket-logo"><Icon name='ticket' size='large'/></div>
        <div className="ticket-desc">
          ${cost} - {description}
        </div>
        <div className="controls">
          <div className="ticket-numbers">{quantity}</div>
        </div>
      </div>
    );
  }
};
