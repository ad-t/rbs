import * as mobx from 'mobx';
import TicketState from 'src/components/Ticket/Ticket.state';

export class TicketingSystemState {
  ticketElements = mobx.observable([] as JSX.Element[]);
  ticketStates = mobx.observable([] as TicketState[]);

  addTicket(element: JSX.Element, state: TicketState) {
    this.ticketElements.push(element);
    this.ticketStates.push(state);
  }
}
