import React from 'react';
import SeatingState from 'src/components/Seating/Seating.state';
import { TicketingSystemState } from 'src/components/TicketingSystem/TicketingSystem.state';
import { createCheckout } from './create';

export default {
  title: 'Component/Checkout',
};

export const Default = () => {
  const seatingState = new SeatingState(5);
  const ticketingSystemState = new TicketingSystemState();
  const { CheckoutElement } = createCheckout(
    seatingState,
    ticketingSystemState
  );
  return <CheckoutElement />;
};
