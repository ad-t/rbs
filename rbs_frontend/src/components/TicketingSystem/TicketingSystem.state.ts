import * as mobx from 'mobx';
import TicketState from 'src/components/Ticket/Ticket.state';
import { ShowNight } from 'src/shared/types';

export class TicketingSystemState {
  ticketElements = mobx.observable([] as JSX.Element[]);
  ticketStates = mobx.observable([] as TicketState[]);
  showNights = mobx.observable([] as ShowNight[]);

  addTicket(element: JSX.Element, state: TicketState) {
    this.ticketElements.push(element);
    this.ticketStates.push(state);
  }

  setShowNights(showNights: ShowNight[]) {
    this.showNights.replace(showNights);
  }
}
