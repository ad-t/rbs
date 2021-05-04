import React from 'react';
import { Story } from '@storybook/react';
import { createSeating } from './create';

export default {
  title: 'Component/Seating',
};

export const SeatingArrangement: Story = () => {
  const { SeatingElement } = createSeating();

  return <SeatingElement />;
};
