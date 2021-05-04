import React from 'react';
import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react-lite';
import { SeatState, SeatType } from 'src/shared/enums';
import { ToastError } from 'src/shared/errors';

import SeatingState, { SeatInfo } from './Seating.state';
import installSeatingInfo from './Seating.service';

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

  function seatFactory(
    column: JSX.Element[],
    seat: SeatInfo,
    rowIndex: number,
    columnIndex: number,
    seatIndex: number
  ) {
    const id = `r${rowIndex}c${columnIndex}s${seatIndex}`;
    const isSelected = seatingState.selectedSeats.find(
      (selected) => selected === id
    );
    const isBooked = seatingState.bookedSeats.find(
      (selected) => selected === id
    );
    const isSelectable = !isBooked && seat.seatState !== SeatState.TAKEN;

    let currentState = seat.seatState;

    if (isSelected) {
      currentState = SeatState.RESERVED;
    } else if (isBooked) {
      currentState = SeatState.BOOKED;
    }

    column.push(
      <Seat
        id={id}
        state={currentState}
        wheelChair={seat.seatType === SeatType.WHEELCHAIR}
        onClick={isSelectable ? onClick : undefined}
      />
    );
  }

  const SeatingElement = mobxReact.observer(() => {
    const rows: JSX.Element[] = [];

    seatingState.seatingArrangement.forEach((rowInfo, rowIndex) => {
      const column1: JSX.Element[] = [];
      const column2: JSX.Element[] = [];
      const column3: JSX.Element[] = [];

      rowInfo.column1.forEach((seat, seatIndex) =>
        seatFactory(column1, seat, rowIndex, 1, seatIndex)
      );

      rowInfo.column2.forEach((seat, seatIndex) =>
        seatFactory(column2, seat, rowIndex, 2, seatIndex)
      );

      rowInfo.column3.forEach((seat, seatIndex) =>
        seatFactory(column3, seat, rowIndex, 3, seatIndex)
      );

      rows.push(<Row column1={column1} column2={column2} column3={column3} />);
    });

    return <Seating rows={rows} />;
  });

  return {
    SeatingElement,
    seatingState,
  };
}
