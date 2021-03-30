/*
 * This component will return an invoice that shows what tickets were purchased from the user.
 */
import React from 'react';
import { Button, Icon, Header, Segment, Grid, List } from 'semantic-ui-react';

import TicketNoControl from '../TicketNoControl';

// Import our interface
import { ITicket, ITicketDetails } from '../../../types/tickets';

interface Prop {
  // TODO: make this into a proper React type
  tickets: ITicket[];
  ticketDetails: ITicketDetails[];
  details: any;
}

export default class ConfirmOrder extends React.Component<Prop, {}> {
  render() {
    const { details, tickets, ticketDetails } = this.props;

    console.log(details);

    const orderID = details.orderID.slice(0, 6).toUpperCase();

    const ticketElms: Array<JSX.Element> = [];
    let totalQty = 0;
    for (let i = 0; i < tickets.length; ++i) {
      const ticket: ITicket = tickets[i];
      console.log(ticket);
      ticketElms.push(
        <Segment>
          <List>
            <List.Item>
              <List.Icon name='ticket' />
              <List.Content>{ticket.description} - ${`${ticket.price.toFixed(2)}`}</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='marker' />
              <List.Content>{ticket.quantity}</List.Content>
            </List.Item>
            {ticketDetails.filter(x => x.typeId === ticket.id).map(x => (
              <List.Item>
                <List.Icon name='mail' />
                <List.Content>
                  {x.name} ({x.seatNum})
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Segment>
        /*
        <TicketNoControl
          key={i}
          index={i}
          cost={ticket.price}
          description={ticket.description}
          quantity={ticket.quantity}
        />
        */
      );
      totalQty += ticket.quantity;
    }

    // TODO: show info about tickets booked
    return (
      <Grid columns={2} stackable>
      <Grid.Column>
        <div className="confirmation">
          <div className="booking-info">
            <Header as='h2'>Thank you!</Header>
            <p>Your payment was successful for {totalQty} tickets.</p>
            <p>Here's your booking reference &ndash; please keep it safe.</p>
            <p><span style={{font:"bold 20px monospace"}}>{orderID}</span></p>
            <p>A copy of this booking confirmation has been sent to <strong>{details.email}</strong>.</p>
            <p>No GST applies for this purchase.</p>
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