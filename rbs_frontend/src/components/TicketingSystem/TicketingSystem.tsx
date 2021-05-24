/*
 * This file will handle information relating to the show
 */
import React from 'react';
import { Container, Image } from 'semantic-ui-react';
import { BookingHeader } from 'src/components/Header/Header';
import { TicketSystemState } from 'src/shared/enums';
import ConfirmOrder from '../../pages/ConfirmOrder';
import LogoImage from './logo.png';

interface TicketingSystemProps {
  Steps: JSX.Element;
  SelectSeat: JSX.Element;
  BookTickets: JSX.Element;
  ShowNights: JSX.Element;
  paymentStep: TicketSystemState;
}

export function TicketingSystem({
  paymentStep,
  Steps,
  BookTickets,
  SelectSeat,
  ShowNights,
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
      displayElm = <div>Invoice Stub</div>;
      break;
    case TicketSystemState.CONFIRM:
      displayElm = (
        <ConfirmOrder
          showStr=""
          tickets={[]}
          ticketDetails={[]}
          details={{}}
          discount={null}
        />
      );
      break;
  }

  return (
    <>
      <BookingHeader
        Logo={
          <Image
            size="small"
            src={LogoImage}
            style={{ marginRight: '1.5em' }}
          />
        }
        email="ticketing@medrevue.org"
        showName="Med Revue 2021"
      />

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
