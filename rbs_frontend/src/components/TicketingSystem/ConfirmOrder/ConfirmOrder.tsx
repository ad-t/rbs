/*
 * This component will return an invoice that shows what tickets were purchased from the user.
 */
import React from 'react';
import { Button, Icon, Header, Segment, Grid } from 'semantic-ui-react';

import TicketNoControl from '../TicketNoControl';

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
    const { tickets } = details;

    const ticketElms: Array<JSX.Element> = [];
    let totalQty = 0;
    for (let i = 0; i < tickets.length; ++i) {
      const ticket: ITicket = tickets[i];
      ticketElms.push(
        <TicketNoControl
          key={i}
          index={i}
          cost={ticket.price}
          description={ticket.description}
          quantity={ticket.quantity}
        />
      );
      totalQty += ticket.quantity;
    }

    // TODO: show info about tickets booked
    return (
      <Grid columns={2} stackable>
      <Grid.Column>
        <div className="confirmation">
          <div className="booking-info">
            <Header as='h2'>Payment Complete</Header>
            <p>Thanks for purchasing {totalQty} tickets!</p>
            <p>Booking reference: <pre>{orderID}</pre></p>
          </div>
        </div>
      </Grid.Column>
      <Grid.Column>
        <Header as='h2'>Tickets</Header>
        <div className="tickets-list">
          <Segment>
            {ticketElms}
          </Segment>
        </div>
      </Grid.Column>
      </Grid>
    );
  }
};
