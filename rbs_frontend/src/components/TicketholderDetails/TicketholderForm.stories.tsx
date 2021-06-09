import React from 'react';
import { createTicketholderDetailsForm } from './create';

export default {
  title: 'Component/TicketHolderForm',
};

export const Default = () => {
  const { TicketHolderFormElement } = createTicketholderDetailsForm({
    index: 0,
    seatNum: '100',
    description: 'General Admission',
  });

  return <TicketHolderFormElement />;
};
