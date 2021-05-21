import * as React from 'react';
import { createSeating } from 'src/components/Seating/create';
import { Story } from '@storybook/react';
import SelectSeats from './SelectSeats';
import 'semantic-ui-css/semantic.min.css';

export default {
  title: 'Page/SelectSeats',
};

export const Default: Story = () => {
  const { SeatingElement } = createSeating(5);

  return <SelectSeats SeatingSelector={<SeatingElement />} />;
};
