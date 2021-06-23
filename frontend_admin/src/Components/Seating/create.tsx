import React from 'react';
import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react-lite';
import styled from 'styled-components';
import { SeatState, SeatType } from 'src/shared/enums';

import { ChangeSeatToggle } from './ChangeSeatToggle';
import SeatingState from './Seating.state';
import installSeatingInfo, { RowNumbers } from './Seating.service';

import Row from './Row';
import Seat from './Seat';
import Seating from './Seating';

export const SeatingWrapper = styled.div`
  margin: 1rem 0;
  overflow-x: auto;
  width: 100%;
`;

export function createSeating() {
  const seatingState = new SeatingState();

  installSeatingInfo(seatingState);

  const onClick = mobx.action((event: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget;

    if (seatingState.takenSeats.find((selected) => selected === id)) {
      (seatingState.takenSeats as mobx.IObservableArray<string>).remove(id);
      return;
    }

    seatingState.takenSeats.push(id);
  });

  const SeatingElement = mobxReact.observer(() => {
    const rows: JSX.Element[] = [];

    let lastSeatIndex = 0;

    RowNumbers.forEach((numbers, rowIndex) => {
      const total = numbers.column1 + numbers.column2 + numbers.column3;

      const seats = seatingState.seatingArrangement
        .slice(lastSeatIndex, lastSeatIndex + total)
        .map((seat, index) => {
          const id = (lastSeatIndex + index).toString();
          const isSelected = seatingState.selectedSeats.find(
            (seatId) => seatId === id
          );
          const isBooked = seatingState.bookedSeats.find(
            (seatId) => seatId === id
          );
          const isTaken = seatingState.takenSeats.find(
            (seatId) => seatId === id
          );

          let seatState = seat.seatState;

          if (isSelected) {
            seatState = SeatState.RESERVED;
          } else if (isBooked) {
            seatState = SeatState.BOOKED;
          } else if (isTaken) {
            seatState = SeatState.TAKEN;
          }

          return (
            <Seat
              key={id}
              id={id}
              state={seatState}
              wheelChair={seat.seatType === SeatType.WHEELCHAIR}
              onClick={onClick}
            />
          );
        });

      rows.push(<Row key={`row-${rowIndex}`} {...numbers} seats={seats} />);
      lastSeatIndex += total;
    });

    return (
      <>
        <p>To set seats as taken, all you have to click on the seats below.</p>
        <ChangeSeatToggle />
        <SeatingWrapper>
          <Seating rows={rows} />
        </SeatingWrapper>
      </>
    );
  });

  return {
    SeatingElement,
    seatingState,
  };
}
