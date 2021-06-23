import * as React from 'react';
import styled from 'styled-components';
import * as variables from 'src/shared/css.variables';
import { SeatState } from 'src/shared/enums';
import Seat from './Seat';

export const LegendWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;

  @media (min-width: ${variables.mediaSmall}) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
`;

export const Legend = styled.div`
  background: ${variables.grey200};
  display: flex;
  align-items: center;
  padding: 0.75rem;

  button {
    margin-right: 0.5rem;
  }
`;

export function ChangeSeatToggle() {
  return (
    <LegendWrapper>
      <Legend>
        <Seat wheelChair /> Wheelchair seating
      </Legend>
      <Legend>
        <Seat /> Free seat
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
  );
}
