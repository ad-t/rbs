import React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { SeatType } from 'src/shared/enums';

import SeatingState from './Seating.state';
import installSeatingInfo from './Seating.service';

import Row from './Row';
import Seat from './Seat';
import Seating from './Seating';

export function createSeating() {
  const seatingState = new SeatingState();

  installSeatingInfo(seatingState);

  const SeatingElement = mobxReact.observer(() => {
    const rows: JSX.Element[] = [];

    function onClick(event: React.MouseEvent<HTMLButtonElement>) {
      console.log(event.currentTarget.id);
    }

    seatingState.state.forEach((rowInfo, rowIndex) => {
      const column1: JSX.Element[] = [];
      const column2: JSX.Element[] = [];
      const column3: JSX.Element[] = [];

      rowInfo.column1.forEach((seat, seatIndex) => {
        column1.push(
          <Seat
            id={`r${rowIndex}s${seatIndex}`}
            state={seat.seatState}
            wheelChair={seat.seatType === SeatType.WHEELCHAIR}
            onClick={onClick}
          />
        );
      });

      rowInfo.column2.forEach((seat, seatIndex) => {
        column2.push(
          <Seat
            id={`r${rowIndex}s${column1.length + seatIndex}`}
            state={seat.seatState}
            wheelChair={seat.seatType === SeatType.WHEELCHAIR}
            onClick={onClick}
          />
        );
      });

      rowInfo.column3.forEach((seat, seatIndex) => {
        column3.push(
          <Seat
            id={`r${rowIndex}s${column1.length + column2.length + seatIndex}`}
            state={seat.seatState}
            wheelChair={seat.seatType === SeatType.WHEELCHAIR}
            onClick={onClick}
          />
        );
      });

      rows.push(<Row column1={column1} column2={column2} column3={column3} />);
    });

    return <Seating rows={rows} />;
  });

  return {
    SeatingElement,
    seatingState,
  };
}
