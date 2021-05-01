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
