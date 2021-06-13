/*
 * This component will return an invoice that shows what tickets were purchased from the user.
 */
import React from 'react';
import { Card, Divider, Header, Grid } from 'semantic-ui-react';

interface Props {
  email: string;
  orderID: string;
  showName: string;
  TicketInfoElements: JSX.Element[];
}

export default function ConfirmOrder({
  email,
  orderID,
  showName,
  TicketInfoElements,
}: Props) {
  const totalQty = TicketInfoElements.length;

  return (
    <Grid stackable>
      <Grid.Column width={6}>
        <div className="confirmation">
          <div className="booking-info">
            <Header as="h3">
              Thank you, we have confirmed your booking for {showName}!
            </Header>
            <p>
              Your payment was successful for {totalQty}{' '}
              {totalQty === 1 ? 'ticket' : 'tickets'}.
            </p>
            <p>Here's your booking reference &ndash; please keep it safe.</p>
            <p>
              <span style={{ font: 'bold 20px monospace' }}>{orderID}</span>
            </p>
            <p>
              A copy of this booking confirmation has been sent to{' '}
              <strong>{email}</strong>.
            </p>
            <Header as="h5">
              Hosted at the UNSW Science Theatre. Doors open 7pm
            </Header>
            <Divider />
            <Header.Subheader>
              No GST applies for this purchase.
            </Header.Subheader>
          </div>
        </div>
      </Grid.Column>
      <Grid.Column width={10}>
        <Header as="h2">Ticket holder information</Header>
        <Card.Group>{TicketInfoElements}</Card.Group>
      </Grid.Column>
    </Grid>
  );
}
