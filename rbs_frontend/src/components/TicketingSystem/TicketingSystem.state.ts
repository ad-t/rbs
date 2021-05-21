import * as mobx from 'mobx';
import TicketState from 'src/components/Ticket/Ticket.state';
import { ShowNight } from 'src/shared/types';
import { TicketSystemState } from 'src/shared/enums';

export class TicketingSystemState {
  ticketElements: JSX.Element[] = [];
  ticketStates: TicketState[] = [];
  showNights: ShowNight[] = [];

  selectedShowNight: number | undefined;

  paymentStep = TicketSystemState.SELECT_SHOW;

  constructor() {
    mobx.makeAutoObservable(this);
  }

  addTicket(element: JSX.Element, state: TicketState) {
    this.ticketElements.push(element);
    this.ticketStates.push(state);
  }

  setShowNights(showNights: ShowNight[]) {
    this.showNights = showNights;
  }
}
