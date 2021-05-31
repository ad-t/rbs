import React from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TicketholderDetails, { Props } from './TicketholderDetails';
import { observable, action as mobxAction } from 'mobx';

import { ITicketDetails } from 'src/types/ticket';

export default {
  title: 'Component/TicketholderDetails',
  component: TicketholderDetails,
};


const Template: Story<Props> = (args) => <TicketholderDetails {...args} />;

export const Default = Template.bind({});
const details: ITicketDetails = observable({
  name: '',
  postcode: '',
  phone: '',
  seatNum: 'r1c3s4',
});

Default.args = {
  index: 2,
  details,
  description: 'Arc (Group 4+)',
  showErrors: true,
  onChange: mobxAction((name: string, value: string) => {
    details[name] = value;
    action('updated value')(name, value);
  }),
};
