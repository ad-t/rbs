import React from 'react';
import Row from './Row';
import Seat from './Seat';

export default {
  title: 'Component/Seating/Row',
  components: Row,
};

export const MultipleRows = () => (
  <>
    <Row
      column1={3}
      column2={4}
      column3={3}
      seats={[
        <Seat />,
        <Seat />,
        <Seat />,
        <Seat />,
        <Seat />,
        <Seat />,
        <Seat />,
        <Seat />,
        <Seat />,
        <Seat />,
      ]}
    />
    <Row
      column1={3}
      column2={4}
      column3={3}
      seats={[
        <Seat />,
        <Seat />,
        <Seat />,
        <Seat />,
        <Seat />,
        <Seat />,
        <Seat />,
        <Seat />,
        <Seat />,
        <Seat />,
      ]}
    />
  </>
);
