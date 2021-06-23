import React from 'react';
import { Story } from '@storybook/react';
import { SeatState } from 'src/shared/enums';
import Seat, { SeatProps } from './Seat';

export default {
  title: 'Component/Seating/Seat',
  components: Seat,
  argTypes: {
    state: { options: SeatState, control: { type: 'select' } },
    wheelChair: { control: { type: 'boolean' } },
  },
};

const SeatTemplate: Story<SeatProps> = (args) => <Seat {...args} />;

export const DefaultSeat = SeatTemplate.bind({});
DefaultSeat.args = {
  state: SeatState.FREE,
};
