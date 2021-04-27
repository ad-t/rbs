import React from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Ticket, { TicketProps } from './Ticket';

export default {
  title: 'Component/Ticket',
  component: Ticket,
};

const Template: Story<TicketProps> = (args) => <Ticket {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 'test',
  name: 'Random Ticket',
  cost: 10,
  ticketAmount: 0,
  updateTickets: action('updateTickets'),
};

export const MultipleTickets: React.VFC = () => (
  <>
    <Ticket
      id="0"
      name="First Ticket"
      cost={10}
      minPurchase={0}
      ticketAmount={5}
      updateTickets={action('updateTickets')}
    />
    <div style={{ padding: '0.25rem' }} />
    <Ticket
      id="1"
      name="Second Ticket"
      cost={20}
      minPurchase={0}
      ticketAmount={15}
      updateTickets={action('updateTickets')}
    />
    <div style={{ padding: '0.25rem' }} />
    <Ticket
      id="2"
      name="Third Ticket"
      cost={30}
      minPurchase={0}
      ticketAmount={0}
      updateTickets={action('updateTickets')}
    />
    <div style={{ padding: '0.25rem' }} />
    <Ticket
      id="3"
      name="Fourth Ticket"
      cost={40}
      minPurchase={5}
      ticketAmount={5}
      updateTickets={action('updateTickets')}
    />
  </>
);
