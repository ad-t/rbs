import * as React from 'react';
import { Story } from '@storybook/react';
import SelectSeats from './SelectSeats';
import 'semantic-ui-css/semantic.min.css';

export default {
  title: 'Page/SelectSeats',
};

interface StoryProps {
  selectedSeats: string[];
}

const Template: Story<StoryProps> = (args) => <SelectSeats {...args} />;

export const Default = Template.bind({});
Default.args = {
  selectedSeats: ['0', '1'],
};
