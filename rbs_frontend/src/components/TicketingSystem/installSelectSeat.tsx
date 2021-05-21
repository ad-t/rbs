import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { createSeating } from 'src/components/Seating/create';
import SelectSeats from 'src/pages/SelectSeats';

export function installSelectSeat() {
  const { SeatingElement, seatingState } = createSeating(0);

  const SelectSeatWrapper = mobxReact.observer(() => (
    <SelectSeats SeatingSelector={<SeatingElement />} />
  ));

  return { SelectSeatWrapper, seatingState };
}
