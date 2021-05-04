import * as mobx from 'mobx';
import { SeatState, SeatType } from 'src/shared/enums';
import SeatingState, { RowInfo } from './Seating.state';

const seatingPlan: RowInfo[] = [
  // Row AA
  {
    column1: [
      {
        seatType: SeatType.WHEELCHAIR,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.WHEELCHAIR,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.WHEELCHAIR,
        seatState: SeatState.TAKEN,
      },
    ],
    column2: [
      {
        seatType: SeatType.WHEELCHAIR,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.WHEELCHAIR,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.WHEELCHAIR,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.WHEELCHAIR,
        seatState: SeatState.TAKEN,
      },
    ],
    column3: [
      {
        seatType: SeatType.WHEELCHAIR,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.WHEELCHAIR,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.WHEELCHAIR,
        seatState: SeatState.TAKEN,
      },
    ],
  },
  // Row BB
  {
    column1: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
    ],
    column2: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
    ],
    column3: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
    ],
  },
  // Row CC
  {
    column1: [
      {
        seatType: SeatType.WHEELCHAIR,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
    ],
    column2: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
    ],
    column3: [
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
      },
      {
        seatType: SeatType.COMMON,
        seatState: SeatState.TAKEN,
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

export default function installSeatingInfo(seatingState: SeatingState) {
  seatingPlan.forEach((row) => {
    seatingState.seatingArrangement.push(mobx.observable(row));
  });
}
