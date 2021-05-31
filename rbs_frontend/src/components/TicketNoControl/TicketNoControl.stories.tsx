import React from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TicketNoControl, { Props as TicketNoControlProps } from './TicketNoControl';

export default {
  title: 'Component/TicketNoControl',
  component: TicketNoControl,
};

const Template: Story<TicketNoControlProps> = (args) => <TicketNoControl {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 'test',
  description: 'Random Ticket',
  cost: 10,
};

export const MultipleTickets: React.VFC = () => (
  <>
    <TicketNoControl
      id="0"
      description="First Ticket"
      cost={10}
    />
    <div style={{ padding: '0.25rem' }} />
    <TicketNoControl
      id="1"
      description="Second Ticket"
      cost={20}
    />
    <div style={{ padding: '0.25rem' }} />
    <TicketNoControl
      id="2"
      description="Third Ticket"
      cost={30}
    />
    <div style={{ padding: '0.25rem' }} />
    <TicketNoControl
      id="3"
      description="Fourth Ticket"
      cost={40}
    />
  </>
);
