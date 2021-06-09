import * as mobx from 'mobx';
import TicketState from 'src/components/Ticket/Ticket.state';
import { ShowNight } from 'src/shared/types';
import { TicketSystemState } from 'src/shared/enums';

export class TicketingSystemState {
  ticketElements: JSX.Element[] = [];
  ticketStates: TicketState[] = [];
  showNights: ShowNight[] = [];

  paymentStep = TicketSystemState.SELECT_SHOW;

  constructor() {
    mobx.makeAutoObservable(this);
  }
}

export class UserState {
  selectedShow: number | undefined;
  selectedTicket: number | undefined;

  constructor() {
    mobx.makeAutoObservable(this);
  }
}
