import TicketState from 'src/components/Ticket/Ticket.state';
import { TicketSystemState } from 'src/shared/enums';
import { ShowNight } from 'src/shared/types';
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
}
