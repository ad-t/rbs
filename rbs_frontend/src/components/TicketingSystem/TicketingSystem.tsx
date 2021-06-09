/*
 * This file will handle information relating to the show
 */
import React from 'react';
import { Container } from 'semantic-ui-react';
import { BookingHeader } from 'src/components/Header/Header';
import { TicketSystemState } from 'src/shared/enums';

interface TicketingSystemProps {
  Steps: React.ReactNode;
  SelectSeat: React.ReactNode;
  BookTickets: React.ReactNode;
  ShowNights: React.ReactNode;
  Checkout: React.ReactNode;
  ConfirmOrder: React.ReactNode;
  paymentStep: TicketSystemState;
}

export function TicketingSystem({
  paymentStep,
  Steps,
  BookTickets,
  SelectSeat,
  ShowNights,
  ConfirmOrder,
  Checkout,
}: TicketingSystemProps) {
  let displayElm;

  switch (paymentStep) {
    case TicketSystemState.SELECT_SHOW:
      displayElm = ShowNights;
      break;
    case TicketSystemState.BOOK_TICKETS:
      displayElm = BookTickets;
      break;
    case TicketSystemState.SELECT_SEATS:
      displayElm = SelectSeat;
      break;
    case TicketSystemState.INVOICE:
      displayElm = Checkout;
      break;
    case TicketSystemState.CONFIRM:
      displayElm = ConfirmOrder;
      break;
  }

  return (
    <>
      <BookingHeader showName="Revue Booking System" />

      <Container
        style={{
          position: 'relative',
          padding: '1rem',
        }}
      >
        <div style={{ marginBottom: '2rem' }}>{Steps}</div>

        {displayElm}
      </Container>
    </>
  );
}
