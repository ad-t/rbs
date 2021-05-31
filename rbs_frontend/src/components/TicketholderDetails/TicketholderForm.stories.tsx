import React from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { createTicketholderDetailsForm } from './create';
import { observable, action as mobxAction } from 'mobx';

import { ITicketDetails } from 'src/types/ticket';

export default {
  title: 'Component/TicketHolderForm',
};

const Template: Story<Props> = (args) => <TicketholderDetails {...args} />;

export const Default = Template.bind({});
const details: ITicketDetails = {
  name: '',
  postcode: '',
  phone: '',
  seatNum: '1',
};

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
