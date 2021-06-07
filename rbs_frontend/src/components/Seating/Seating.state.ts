import * as mobx from 'mobx';
import { SeatState, SeatType } from 'src/shared/enums';

export interface SeatInfo {
  seatType: SeatType;
  seatState: SeatState;
}

export default class SeatingState {
  seatingArrangement: SeatInfo[] = [];
  selectedSeats: string[] = [];
  bookedSeats: string[] = [];
  takenSeats: string[] = [];
  maximumSelected: number;

  constructor(maximumSelected: number) {
    mobx.makeAutoObservable(this);
    this.maximumSelected = maximumSelected;
  }

  userMaxedTickets() {
    return (
      this.selectedSeats.length + this.bookedSeats.length >=
      this.maximumSelected
    );
  }
}
