import * as mobx from 'mobx';
import { SeatState, SeatType } from 'src/shared/enums';

export interface SeatInfo {
  seatType: SeatType;
  seatState: SeatState;
}

export default class SeatingState {
  seatingArrangement: SeatInfo[] = [];
  selectedSeats = mobx.observable([] as string[]);
  bookedSeats = mobx.observable([] as string[]);
  maximumSelected: number;

  constructor(maximumSelected: number) {
    this.maximumSelected = maximumSelected;
  }

  userMaxedTickets() {
    return (
      this.selectedSeats.length + this.bookedSeats.length >=
      this.maximumSelected
    );
  }
}
