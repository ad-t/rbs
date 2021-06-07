import * as React from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { createTicket } from 'src/components/Ticket/create';
import BookTickets from './BookTickets';
import 'semantic-ui-css/semantic.min.css';

export default {
  title: 'Page/BookTickets',
};

const ticket = createTicket({
  name: 'General Admission',
  cost: 15,
  minPurchase: 1,
  initialAmount: 0,
});

const ticket2 = createTicket({
  name: 'Arc Admission',
  cost: 15,
  minPurchase: 1,
  initialAmount: 0,
});

interface StoryProps {
  totalPrice: number;
  preventProceed: boolean;
}

const Template: Story<StoryProps> = (args) => (
  <BookTickets
    tickets={[<ticket.Ticket />, <ticket2.Ticket />]}
    retract={action('Retract')}
    advance={action('Advance')}
    {...args}
  />
);

export const Default = Template.bind({});
Default.args = {
  totalPrice: 50,
  preventProceed: false,
};
