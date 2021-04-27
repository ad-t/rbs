import React from 'react';
import { Story } from '@storybook/react';
import Steps from './Steps';

export default {
  title: 'Component/Steps',
  component: Steps,
};

const Template: Story = () => <Steps />;

export const Default = Template.bind({});
