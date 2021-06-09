import TicketState from './Ticket.state';

export default class TicketController {
  incrementTickets(state: TicketState, value: number, minPurchase: number) {
    let newTicketNumber = state.value + value;
    if (newTicketNumber < minPurchase) {
      if (value > 0) newTicketNumber = minPurchase;
      else newTicketNumber = 0;
    }

    state.value = newTicketNumber;
  }

  setName(state: TicketState, name: string) {
    state.name = name;
  }
}
