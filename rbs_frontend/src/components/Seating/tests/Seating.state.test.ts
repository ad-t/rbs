import SeatingState from '../Seating.state';

describe('Testing SeatingState', () => {
  test('Able to determine if user selected the maximum amount of tickets', () => {
    const state = new SeatingState(5);

    expect(state.bookedSeats).toHaveLength(0);
    expect(state.selectedSeats).toHaveLength(0);
    expect(state.userMaxedTickets()).toBe(false);

    state.bookedSeats.push('1');
    state.bookedSeats.push('2');
    state.bookedSeats.push('3');

    state.selectedSeats.push('4');
    state.selectedSeats.push('5');

    expect(state.bookedSeats).toHaveLength(3);
    expect(state.selectedSeats).toHaveLength(2);
    expect(state.userMaxedTickets()).toBe(true);
  });
});
