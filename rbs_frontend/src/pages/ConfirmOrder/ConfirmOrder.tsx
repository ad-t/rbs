/*
 * This component will return an invoice that shows what tickets were purchased from the user.
 */
import React from 'react';
import { Header, Segment, Grid, List } from 'semantic-ui-react';

// Import our interface
import { ITicket, ITicketDetails } from '../../types/tickets';

interface Props {
  email: string;
  orderID: string;
  showName: string;
  tickets: ITicket[];
  ticketDetails: ITicketDetails[];
}

export default function ConfirmOrder({
  email,
  orderID,
  showName,
  tickets,
  ticketDetails,
}: Props) {
  const ticketElms: Array<JSX.Element> = [];
  let totalQty = 0;
  for (let i = 0; i < tickets.length; ++i) {
    const ticket: ITicket = tickets[i];
    if (!ticket.quantity) continue;
    ticketElms.push(
      <Segment>
        <List>
          <List.Item>
            <List.Icon name="ticket" />
            <List.Content>
              {ticket.description} - ${`${ticket.price.toFixed(2)}`}
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="marker" />
            <List.Content>{ticket.quantity}</List.Content>
          </List.Item>
          {ticketDetails
            .filter((x) => x.typeId === ticket.id)
            .map((x) => (
              <List.Item>
                <List.Icon name="mail" />
                <List.Content>
                  {x.name} ({x.seatNum})
                </List.Content>
              </List.Item>
            ))}
        </List>
      </Segment>
    );
    totalQty += ticket.quantity;
  }

  // TODO: show info about tickets booked
  return (
    <Grid columns={2} stackable>
      <Grid.Column>
        <div className="confirmation">
          <div className="booking-info">
            <Header as="h2">Thank you!</Header>
            <p>
              Your payment was successful for {totalQty}{' '}
              {totalQty > 1 ? 'tickets' : 'ticket'}.
            </p>
            <p>Here's your booking reference &ndash; please keep it safe.</p>
            <p>
              <span style={{ font: 'bold 20px monospace' }}>{orderID}</span>
            </p>
            <p>
              A copy of this booking confirmation has been sent to{' '}
              <strong>{email}</strong>.
            </p>
            <p>For {showName}</p>
            <p>At the UNSW Science Theatre</p>
            <p>Doors open 7pm</p>
            <p>No GST applies for this purchase.</p>
          </div>
        </div>
      </Grid.Column>
      <Grid.Column>
        <Header as="h2">Tickets</Header>
        <div className="tickets-list">
          <Segment>{ticketElms}</Segment>
        </div>
      </Grid.Column>
    </Grid>
  );
}
