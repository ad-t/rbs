import React from 'react';
import { TicketingSystemState } from 'src/components/TicketingSystem/TicketingSystem.state';
import { createCheckout } from './create';

export default {
  title: 'Component/Checkout',
};

export const Default = () => {
  const ticketingSystemState = new TicketingSystemState();
  const { CheckoutElement } = createCheckout(ticketingSystemState);
  return <CheckoutElement />;
};
