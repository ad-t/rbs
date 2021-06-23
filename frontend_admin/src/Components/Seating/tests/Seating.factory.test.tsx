import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createSeating } from '../create';

describe('Testing Seating create factory', () => {
  test('Able to let the user interact with seats', () => {
    const { SeatingElement, seatingState } = createSeating(5);

    const { getAllByRole } = render(<SeatingElement />);
    const btns = getAllByRole('button');

    expect(seatingState.selectedSeats).toHaveLength(0);
    userEvent.click(btns[23]);
    userEvent.click(btns[24]);
    userEvent.click(btns[25]);
    expect(seatingState.selectedSeats[0]).toBe('23');
    expect(seatingState.selectedSeats[1]).toBe('24');
    expect(seatingState.selectedSeats[2]).toBe('25');
    expect(seatingState.selectedSeats).toHaveLength(3);
  });

  test('Able to deselect seats', () => {
    const { SeatingElement, seatingState } = createSeating(5);

    const { getAllByRole } = render(<SeatingElement />);
    const btns = getAllByRole('button');

    expect(seatingState.selectedSeats).toHaveLength(0);
    userEvent.click(btns[23]);
    userEvent.click(btns[24]);
    userEvent.click(btns[25]);

    const newBtns = getAllByRole('button');
    userEvent.click(newBtns[24]);

    expect(seatingState.selectedSeats[0]).toBe('23');
    expect(seatingState.selectedSeats[1]).toBe('25');
    expect(seatingState.selectedSeats).toHaveLength(2);
  });
});
