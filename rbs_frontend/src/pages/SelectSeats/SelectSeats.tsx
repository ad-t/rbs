/*
 * This component will return an invoice that shows what tickets were purchased from the user.
 */
import React from 'react';
import { Button, Header, Icon } from 'semantic-ui-react';
import Seat from 'src/components/Seating/Seat';
import { SeatState } from 'src/shared/enums';
import {
  MainWrapper,
  Legend,
  LegendWrapper,
  SeatingWrapper,
} from './SelectSeats.styled';

interface SelectSeatsProps {
  selectedSeats: number;
  maxSeats: number;
  SeatingSelector: React.ReactNode;
  retract: () => void;
  advance: () => void;
}

export default function SelectSeats({
  SeatingSelector,
  maxSeats,
  selectedSeats,
  retract,
  advance,
}: SelectSeatsProps) {
  return (
    <MainWrapper>
      <Header as="h2">
        Seat Selection ({selectedSeats} / {maxSeats})
      </Header>
      <p>
        <strong>Note:</strong> tickets and seats are not reserved until payment
        is completed.
      </p>
      <LegendWrapper>
        <Legend>
          <Seat /> Free seat
        </Legend>
        <Legend>
          <Seat wheelChair /> Wheelchair seating
        </Legend>
        <Legend>
          <Seat state={SeatState.RESERVED} /> Selected seat
        </Legend>
        <Legend>
          <Seat state={SeatState.BOOKED} /> Seat booked by you
        </Legend>
        <Legend>
          <Seat state={SeatState.TAKEN} /> Taken seat
        </Legend>
      </LegendWrapper>
      <SeatingWrapper>{SeatingSelector}</SeatingWrapper>
      <div>
        <Button icon labelPosition="left" onClick={retract}>
          <Icon name="arrow left" />
          Select tickets
        </Button>
        <Button
          primary
          icon
          labelPosition="right"
          disabled={selectedSeats !== maxSeats}
          onClick={advance}
        >
          Next
          <Icon name="arrow right" />
        </Button>
      </div>
    </MainWrapper>
  );
}
