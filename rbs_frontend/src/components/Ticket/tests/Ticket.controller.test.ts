import TicketController from '../Ticket.controller';
import TicketState from '../Ticket.state';

describe('Testing ticket controller', () => {
  it('Should modify the state', () => {
    const state = new TicketState(0);
    const controller = new TicketController();

    expect(state.value).toBe(0);
    controller.incrementTickets(state, 1);
    expect(state.value).toBe(1);
    controller.incrementTickets(state, 4);
    expect(state.value).toBe(5);
  });
});
