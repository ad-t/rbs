import * as React from 'react';
import { Card, Icon } from 'semantic-ui-react';

interface TicketInfoProps {
  name: string;
  postcode: string;
  phone: string;
  seatNumber: string;
}

export function TicketInfo({
  name,
  postcode,
  phone,
  seatNumber,
}: TicketInfoProps) {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <Icon name="ticket" />
          Seat {seatNumber}
        </Card.Header>
        <Card.Description>{name}</Card.Description>
        <Card.Description>Postcode: {postcode}</Card.Description>
        {phone && <Card.Description>Phone: {phone}</Card.Description>}
      </Card.Content>
    </Card>
  );
}
