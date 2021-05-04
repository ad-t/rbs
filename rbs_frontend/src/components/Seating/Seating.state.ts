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

export type SeatingPlan = RowInfo[];

export default class SeatingState {
  state = mobx.observable([] as SeatingPlan);
}
