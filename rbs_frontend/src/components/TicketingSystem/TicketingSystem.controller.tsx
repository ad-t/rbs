import * as mobx from 'mobx';
import TicketState from 'src/components/Ticket/Ticket.state';
import { createTicket } from 'src/components/Ticket/create';
import { TicketSystemState } from 'src/shared/enums';
import { ShowNight } from 'src/shared/types';
import { ITicket } from 'src/types/tickets';
import { TicketingSystemState } from './TicketingSystem.state';

export class TicketingSystemController {
  addTicket(
    state: TicketingSystemState,
    element: JSX.Element,
    ticketState: TicketState
  ) {
    state.ticketElements.push(element);
    state.ticketStates.push(ticketState);
  }

  addTickets(state: TicketingSystemState, tickets: ITicket[]) {
    tickets.forEach((ticket) => {
      const { Ticket, ticketState } = createTicket({
        name: ticket.description,
        cost: ticket.price,
        minPurchase: ticket.minPurchaseAmount,
        initialAmount: 0,
      });

      state.ticketElements.push(<Ticket key={ticket.id} />);
      state.ticketStates.push(ticketState);
    });
  }

  deleteTickets(state: TicketingSystemState) {
    state.ticketElements = [];
    state.ticketStates = [];
  }

  setShowNights(state: TicketingSystemState, showNights: ShowNight[]) {
    state.showNights = showNights;
  }

  advanceStep(state: TicketingSystemState) {
    if (state.paymentStep !== TicketSystemState.INVOICE) {
      state.paymentStep++;
    }
  }

  retractStep(state: TicketingSystemState) {
    if (state.paymentStep > 0) {
      state.paymentStep--;
    }
  }

  constructor() {
    mobx.makeAutoObservable(this);
  }
}
