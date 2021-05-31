import React from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import createCheckout, { CheckoutConfig } from './create';
import { ITicket, ITicketDetails } from 'src/types/ticket';
import * as mobx from 'mobx';

export default {
  title: 'Component/Checkout',
};

const Template: Story<CheckoutConfig> = (args) => {
  const { Checkout, state } = createCheckout(args);
  return <Checkout />;
};

export const Default = Template.bind({});

const tickets: ITicket[] = mobx.observable([{
  id: 1,
  price: 20,
  description: 'General',
  minPurchaseAmount: 1,
  quantity: 1,
}]);

const ticketDetails: ITicketDetails[] = mobx.observable([{
  typeId: 1,
  name: '',
  postcode: '',
  phone: '',
  seatNum: 'r1c2s3',
}]);

Default.args = {
  selectedShow: 1,
  tickets,
  ticketDetails,
  discount: null,
  updatePayment: action('updatePayment'),
};

console.log(ticketDetails);
