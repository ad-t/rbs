import React from 'react';
import styled from 'styled-components';
import { SeatState } from 'src/shared/enums';
import * as variables from 'src/shared/css.variables';

import { FaWheelchair } from 'react-icons/fa';
import { MdEventSeat } from 'react-icons/md';

const BaseSeat = styled.button`
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0.1rem;
  height: 24px;
  width: 24px;
  padding: 0;
`;

const WheelchairSeat = styled(BaseSeat)`
  background: white;
  border: 0.125rem solid ${variables.blue500};
  color: ${variables.blue500};
  cursor: pointer;
`;

const FreeSeat = styled(BaseSeat)`
  background: white;
  border: 0.125rem solid ${variables.grey500};
  color: ${variables.grey500};
  cursor: pointer;

  &:hover {
    border: 0.125rem solid ${variables.grey900};
    color: ${variables.grey900};
  }
`;

const TakenSeat = styled(BaseSeat)`
  background: ${variables.red500};
  border: 0.125rem solid ${variables.red500};
  color: ${variables.red50};
`;

const ReservedSeat = styled(BaseSeat)`
  background: ${variables.yellow500};
  border: 0.125rem solid ${variables.yellow500};
  color: ${variables.yellow50};
  cursor: pointer;

  &:hover {
    background: ${variables.yellow600};
    border: 0.125rem solid ${variables.yellow600};
    color: ${variables.yellow50};
  }
`;

const BookedSeat = styled(BaseSeat)`
  background: ${variables.green500};
  border: 0.125rem solid ${variables.green500};
  color: ${variables.green50};
`;

export interface SeatProps extends React.HTMLAttributes<HTMLButtonElement> {
  state?: SeatState;
  wheelChair?: boolean;
}

export default function Seat({
  state = SeatState.FREE,
  wheelChair,
  ...buttonProps
}: SeatProps) {
  let Component = FreeSeat;

  if (state === SeatState.TAKEN) {
    Component = TakenSeat;
  } else if (state === SeatState.BOOKED) {
    Component = BookedSeat;
  } else if (state === SeatState.RESERVED) {
    Component = ReservedSeat;
  } else if (wheelChair) {
    Component = WheelchairSeat;
  }

  let IconComponent = MdEventSeat;

  if (wheelChair) {
    IconComponent = FaWheelchair;
  }

  return (
    <Component {...buttonProps}>
      <IconComponent />
    </Component>
  );
}
