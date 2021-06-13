import React from 'react';
import ConfirmOrder from './ConfirmOrder';

export default {
  title: 'Page/ConfirmOrder',
  component: ConfirmOrder,
};

export const Default = () => (
  <ConfirmOrder
    email="john.smith@example.com"
    orderID="923983"
    showName="CSE Revue"
    TicketInfoElements={[]}
  />
);
