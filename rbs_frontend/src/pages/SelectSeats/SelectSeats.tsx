/*
 * This component will return an invoice that shows what tickets were purchased from the user.
 */
import React from 'react';
import { Button, Header } from 'semantic-ui-react';
import Seat from 'src/components/Seating/Seat';
import { SeatState } from 'src/shared/enums';
import {
  MainWrapper,
  Legend,
  LegendWrapper,
  SeatingWrapper,
} from './SelectSeats.styled';

interface SelectSeatsProps {
  SeatingSelector: JSX.Element;
}

export default function SelectSeats({ SeatingSelector }: SelectSeatsProps) {
  return (
    <MainWrapper>
      <Header as="h2">Seat Selection</Header>
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
      <Button fluid primary>
        Next
      </Button>
    </MainWrapper>
  );
}
