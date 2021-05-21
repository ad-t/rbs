/*
 * This component will return an invoice that shows what tickets were purchased from the user.
 */
import React from 'react';
import { Button, Header } from 'semantic-ui-react';
import { createSeating } from 'src/components/Seating/create';
import Seat from 'src/components/Seating/Seat';
import { SeatState } from 'src/shared/enums';
import {
  MainWrapper,
  Legend,
  LegendWrapper,
  SeatingWrapper,
} from './SelectSeats.styled';

interface SelectSeatsProps {
  selectedSeats: string[];
}

export default class SelectSeats extends React.Component<SelectSeatsProps> {
  private Seating = createSeating(4);

  constructor(props: SelectSeatsProps) {
    super(props);

    const { seatingState } = this.Seating;
    seatingState.takenSeats.replace(this.props.selectedSeats);
  }

  render() {
    const { SeatingElement } = this.Seating;

    return (
      <MainWrapper>
        <Header as="h2">Seat Selection</Header>
        <p>
          <strong>Note:</strong> tickets and seats are not reserved until
          payment is completed.
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
        <SeatingWrapper>
          <SeatingElement />
        </SeatingWrapper>
        <Button fluid primary>
          Next
        </Button>
      </MainWrapper>
    );
  }
}
