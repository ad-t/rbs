import * as mobx from 'mobx';
import { SeatState, SeatType } from 'src/shared/enums';
import SeatingState, { SeatInfo } from './Seating.state';

interface RowInfo {
  column1: SeatInfo[];
  column2: SeatInfo[];
  column3: SeatInfo[];
}

const seatingPlan: RowInfo[] = [
  // Row AA
  {
    column1: [
      {
        seatType: SeatType.WHEELCHAIR,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.WHEELCHAIR,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.WHEELCHAIR,
        seatState: SeatState.FREE,
      },
    ],
    column2: [
      {
        seatType: SeatType.WHEELCHAIR,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.WHEELCHAIR,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.WHEELCHAIR,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.WHEELCHAIR,
        seatState: SeatState.FREE,
      },
    ],
    column3: [
      {
        seatType: SeatType.WHEELCHAIR,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.WHEELCHAIR,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.WHEELCHAIR,
        seatState: SeatState.FREE,
      },
    ],
  },
  // Row BB
  {
    column1: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
    column2: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
    column3: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
  },
  // Row CC
  {
    column1: [
      {
        seatType: SeatType.WHEELCHAIR,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
    column2: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
    column3: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
  },
  // Row DD
  {
    column1: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
    column2: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
    column3: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
  },
  // Row EE
  {
    column1: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
    column2: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
    column3: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
  },
  // Row A
  {
    column1: [
      {
        seatType: SeatType.WHEELCHAIR,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.WHEELCHAIR,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.WHEELCHAIR,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
    column2: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
    column3: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.WHEELCHAIR,
        seatState: SeatState.FREE,
      },
    ],
  },
  // Row B
  {
    column1: [],
    column2: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
    column3: [],
  },
  // Row C
  {
    column1: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
    column2: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
    column3: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
  },
  // Row D
  {
    column1: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
    column2: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
    column3: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
  },
  // Row E
  {
    column1: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
    column2: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
    column3: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
  },
  // Row F
  {
    column1: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
    column2: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
    column3: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
  },
  // Row G
  {
    column1: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
    column2: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
    column3: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
  },
  // Row H
  {
    column1: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
    column2: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
    column3: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
  },
  // Row I
  {
    column1: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
    column2: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
    column3: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
  },
  // Row J
  {
    column1: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
    column2: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
    column3: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.FREE,
      },
    ],
  },
];

export const RowNumbers = seatingPlan.map((row) => ({
  column1: row.column1.length,
  column2: row.column2.length,
  column3: row.column3.length,
}));

export default function installSeatingInfo(seatingState: SeatingState) {
  seatingPlan.forEach((row) => {
    row.column1.forEach((seat) => {
      seatingState.seatingArrangement.push(mobx.observable(seat));
    });

    row.column2.forEach((seat) => {
      seatingState.seatingArrangement.push(mobx.observable(seat));
    });

    row.column3.forEach((seat) => {
      seatingState.seatingArrangement.push(mobx.observable(seat));
    });
  });
}
