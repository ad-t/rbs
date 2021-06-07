import React from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SquareButton, { SquareProp } from './SquareButton';

export default {
  title: 'Component/SquareButton',
  component: SquareButton,
};

const Template: Story<SquareProp> = (args) => <SquareButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  setupSquare: () => {
    action('open');
    return Promise.resolve('https://www.google.com');
  },
};
