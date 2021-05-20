import React from 'react';
import { Story } from '@storybook/react';
import ConfirmOrder from './ConfirmOrder';
import 'semantic-ui-css/semantic.min.css';

export default {
  title: 'Page/ConfirmOrder',
  component: ConfirmOrder,
};

const Template: Story = (args) => (
  <ConfirmOrder
    tickets={[
      {
        id: 1,
        price: 10,
        description: 'This is a ticket',
        minPurchaseAmount: 5,
      },
      {
        id: 2,
        price: 10,
        description: 'This is a ticket',
        minPurchaseAmount: 5,
      },
    ]}
    ticketDetails={[
      {
        typeId: 1,
        name: 'Basic Ticket',
        postcode: '1234',
        phone: '029678383',
        seatNum: '10',
      },
    ]}
    discount={null}
    showStr="CSE Revue"
    details={{
      email: 'wtf',
      orderID: '923983',
    }}
  />
);

export const Default = Template.bind({});
