import TicketState from './Ticket.state';

export default class TicketController {
  incrementTickets(state: TicketState, value: number) {
    state.value += value;
  }
}
