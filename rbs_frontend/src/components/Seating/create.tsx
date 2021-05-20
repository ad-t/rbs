import React from 'react';
import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react-lite';
import { SeatState, SeatType } from 'src/shared/enums';
import { ToastError } from 'src/shared/errors';

import SeatingState from './Seating.state';
import installSeatingInfo, { RowNumbers } from './Seating.service';

import Row from './Row';
import Seat from './Seat';
import Seating from './Seating';

export function createSeating(maximumSelected: number) {
  const seatingState = new SeatingState(maximumSelected);

  installSeatingInfo(seatingState);

  const onClick = mobx.action((event: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget;

    if (seatingState.selectedSeats.find((selected) => selected === id)) {
      seatingState.selectedSeats.remove(id);
      return;
    }

    if (seatingState.userMaxedTickets()) {
      throw new ToastError(
        'You already have selected the maximum amount of tickets.'
      );
    }

    seatingState.selectedSeats.push(id);
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
          const isClickable = !(isBooked || seat.seatState === SeatState.TAKEN);

          let seatState = seat.seatState;

          if (isSelected) {
            seatState = SeatState.RESERVED;
          } else if (isBooked) {
            seatState = SeatState.BOOKED;
          }

          return (
            <Seat
              key={id}
              id={id}
              state={seatState}
              wheelChair={seat.seatType === SeatType.WHEELCHAIR}
              onClick={isClickable ? onClick : undefined}
            />
          );
        });

      rows.push(<Row key={`row-${rowIndex}`} {...numbers} seats={seats} />);
      lastSeatIndex += total;
    });

    return <Seating rows={rows} />;
  });

  return {
    SeatingElement,
    seatingState,
  };
}
