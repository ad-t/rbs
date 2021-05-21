import * as React from 'react';
import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react-lite';
import { TicketingSystemState } from 'src/components/TicketingSystem/TicketingSystem.state';
import SelectShow from 'src/pages/SelectShow';

export function installShowNights(ticketingSystemState: TicketingSystemState) {
  const ShowNightWrapper = mobxReact.observer(() => (
    <SelectShow
      showNights={ticketingSystemState.showNights}
      updateShow={() => console.log('Called')}
    />
  ));

  return ShowNightWrapper;
}
