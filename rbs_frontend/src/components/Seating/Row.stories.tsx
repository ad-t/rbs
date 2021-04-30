import React from 'react';
import { Story } from '@storybook/react';
import Row, { RowProps } from './Row';
import Seat from './Seat';

export default {
  title: 'Component/Row',
  component: Row,
};

// const Template: Story<RowProps> = (args) => <Row {...args} />;

export const MultipleRows = () => (
  <>
    <Row
      column1={[<Seat />, <Seat />, <Seat />, <Seat />, <Seat />]}
      column2={[<Seat />, <Seat />, <Seat />, <Seat />, <Seat />]}
      column3={[<Seat />, <Seat />, <Seat />, <Seat />, <Seat />]}
    />
    <Row
      column1={[<Seat />, <Seat />, <Seat />, <Seat />, <Seat />]}
      column2={[<Seat />, <Seat />, <Seat />, <Seat />, <Seat />]}
      column3={[<Seat />, <Seat />, <Seat />, <Seat />, <Seat />]}
    />
  </>
);
