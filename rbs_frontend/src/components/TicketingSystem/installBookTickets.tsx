import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { TicketingSystemState } from 'src/components/TicketingSystem/TicketingSystem.state';
import BookTickets from 'src/pages/BookTickets';

export function installBookTickets(ticketingSystemState: TicketingSystemState) {
  const BookTicketsWrapper = mobxReact.observer(() => {
    const { ticketElements, ticketStates } = ticketingSystemState;
    const totalPrice = ticketStates.reduce(
      (total, state) => total + state.value * state.cost,
      0
    );
    const preventProceed =
      ticketStates.reduce((total, state) => total + state.value, 0) === 0;

    return (
      <BookTickets
        tickets={ticketElements}
        totalPrice={totalPrice}
        preventProceed={preventProceed}
      />
    );
  });

  return BookTicketsWrapper;
}
