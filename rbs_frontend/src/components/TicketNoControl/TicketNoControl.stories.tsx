import React from 'react';
import { Story } from '@storybook/react';
import TicketNoControl, { TicketNoControlProps } from './TicketNoControl';

export default {
  title: 'Component/TicketNoControl',
  component: TicketNoControl,
};

const Template: Story<TicketNoControlProps> = (args) => (
  <TicketNoControl {...args} />
);

export const Default = Template.bind({});
Default.args = {
  index: 0,
  description: 'Random Ticket',
  cost: 10,
};

export const MultipleTickets: React.VFC = () => (
  <>
    <TicketNoControl
      index={0}
      description="First Ticket"
      cost={10}
      quantity={10}
    />
    <div style={{ padding: '0.25rem' }} />
    <TicketNoControl
      index={1}
      description="Second Ticket"
      cost={20}
      quantity={10}
    />
    <div style={{ padding: '0.25rem' }} />
    <TicketNoControl
      index={2}
      description="Third Ticket"
      cost={30}
      quantity={10}
    />
    <div style={{ padding: '0.25rem' }} />
    <TicketNoControl
      index={3}
      description="Fourth Ticket"
      cost={40}
      quantity={10}
    />
  </>
);
