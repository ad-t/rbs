import React from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SquareButton, { Props } from './SquareButton';

export default {
  title: 'Component/SquareButton',
  component: SquareButton,
};

const Template: Story<Props> = (args) => <SquareButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  setupSquare: () => { action('open'); return Promise.resolve('hello') },
};

/*
export const MultipleTickets: React.VFC = () => (
  <>
    <Ticket
      id="0"
      name="First Ticket"
      cost={10}
      minPurchase={0}
      ticketAmount={5}
      updateTickets={action('open')}
    />
    <div style={{ padding: '0.25rem' }} />
    <Ticket
      id="1"
      name="Second Ticket"
      cost={20}
      minPurchase={0}
      ticketAmount={15}
      updateTickets={action('open')}
    />
    <div style={{ padding: '0.25rem' }} />
    <Ticket
      id="2"
      name="Third Ticket"
      cost={30}
      minPurchase={0}
      ticketAmount={0}
      updateTickets={action('open')}
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
*/
