import SeatingState from '../Seating.state';
import installSeatingInfo from '../Seating.service';

describe('Testing SeatingService', () => {
  test('Able to add observable stores to the state', () => {
    const state = new SeatingState(5);

    expect(state.seatingArrangement).toHaveLength(0);
    installSeatingInfo(state);
    expect(state.seatingArrangement).toHaveLength(469);
  });
});
