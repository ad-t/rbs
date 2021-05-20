import React from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ShowNight } from 'src/shared/types';
import SelectShow from './SelectShow';
import 'semantic-ui-css/semantic.min.css';

export default {
  title: 'Page/SelectShow',
  component: SelectShow,
};

interface SelectShowProps {
  showNights: ShowNight[];
}

const Template: Story<SelectShowProps> = (args) => (
  <SelectShow updateShow={action('Update show')} {...args} />
);

export const Default = Template.bind({});
Default.args = {
  showNights: [
    {
      id: 0,
      time: '2021-06-11T18:00:00+1000',
      reservedSeats: 350,
      totalSeats: 400,
    },
    {
      id: 1,
      time: '2021-06-12T18:00:00+1000',
      reservedSeats: 400,
      totalSeats: 400,
    },
    {
      id: 2,
      time: '2021-06-13T18:00:00+1000',
      reservedSeats: 200,
      totalSeats: 400,
    },
  ],
};
