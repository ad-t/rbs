import * as mobx from 'mobx';
import { SeatState } from 'src/shared/enums';

export interface SeatInfo {
  seatType: 'COMMON' | 'WHEELCHAIR';
  seatState: SeatState;
}

type SeatingPlan = Array<Array<SeatState>>;

export default mobx.observable([] as SeatingPlan);
