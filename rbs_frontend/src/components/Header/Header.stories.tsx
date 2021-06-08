import React from 'react';
import { Story } from '@storybook/react';
import { BookingHeader } from './Header';

export default {
  title: 'Component/BookingHeader',
  component: BookingHeader,
};

interface HeaderProps {
  email: string;
  showName: string;
}

const Template: Story<HeaderProps> = (args) => <BookingHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
  email: 'ticketing@medrevue.org',
  showName: 'CSE Revue 2021',
};
