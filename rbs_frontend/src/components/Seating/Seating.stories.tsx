import React from 'react';
import { Story } from '@storybook/react';
import { createSeating } from './create';

export default {
  title: 'Component/Seating',
};

export const SeatingArrangement: Story = () => {
  const { SeatingElement } = createSeating(5);

  return <SeatingElement />;
};

const Template: Story<{ maximum: number }> = ({ maximum }) => {
  const { SeatingElement } = createSeating(maximum);

  return <SeatingElement />;
};

export const ModifiableMaximumTickets = Template.bind({});
ModifiableMaximumTickets.args = {
  maximum: 3,
};
