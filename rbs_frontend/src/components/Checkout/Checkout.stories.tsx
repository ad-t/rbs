import React from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Checkout, { CheckoutProps } from './Checkout';

import { ITicket, ITicketDetails } from 'src/types/ticket';

export default {
  title: 'Component/Checkout',
  component: Checkout,
};

const Template: Story<CheckoutProps> = (args) => <Checkout {...args} />;

export const Default = Template.bind({});

const tickets: ITicket[] = [{
  id: 1,
  price: 20,
  description: 'General',
  minPurchaseAmount: 1,
  quantity: 1,
}];

const ticketDetails: ITicketDetails[] = [{
  typeId: 1,
  name: '',
  postcode: '',
  phone: '',
  seatNum: 'r1c2s3',
}];

Default.args = {
  selectedShow: 1,
  tickets,
  ticketDetails,
  discount: null,
  updateTicketDetails: action('updateTicketDetails'),
  updatePayment: action('updatePayment'),
};
