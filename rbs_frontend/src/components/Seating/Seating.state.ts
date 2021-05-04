import * as mobx from 'mobx';
import { SeatState, SeatType } from 'src/shared/enums';

export interface SeatInfo {
  seatType: SeatType;
  seatState: SeatState;
}

export interface RowInfo {
  column1: SeatInfo[];
  column2: SeatInfo[];
  column3: SeatInfo[];
}

export default class SeatingState {
  seatingArrangement: RowInfo[] = [];
  selectedSeats = mobx.observable([] as string[]);
  maximumSelected: number;

  constructor(maximumSelected: number) {
    this.maximumSelected = maximumSelected;
  }
}
