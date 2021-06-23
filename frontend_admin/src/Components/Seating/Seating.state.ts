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

  constructor() {
    mobx.makeAutoObservable(this);
  }
}
