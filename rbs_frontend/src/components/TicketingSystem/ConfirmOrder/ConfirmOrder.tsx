/*
 * This component will return an invoice that shows what tickets were purchased from the user.
 */
import React from 'react';
import { Button, Icon, Header } from 'semantic-ui-react';

// Import our interface
import { ITicket } from '../../../types/tickets';

interface Prop {
  // TODO: make this into a proper React type
  details: any;
}

export default class ConfirmOrder extends React.Component<Prop, {}> {
  render() {
    const { details } = this.props;

    const orderID = details.orderID.slice(0, 6).toUpperCase();

    // TODO: show info about tickets booked
    return (
      <React.Fragment>
        <div className="confirmation">
          <div className="booking-info">
            <Header as='h2'>Payment Complete</Header>
            <p>Thanks for purchasing tickets!</p>
            <p>Booking reference: <pre>{orderID}</pre></p>
          </div>
        </div>
      </React.Fragment>
    );
  }
};
