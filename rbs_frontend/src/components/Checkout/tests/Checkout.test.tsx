import React from 'react';
import * as mobx from 'mobx';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SeatingState from 'src/components/Seating/Seating.state';
import { TicketingSystemState } from 'src/components/TicketingSystem/TicketingSystem.state';
import { createCheckout } from '../create';

describe('Testing <Checkout />', () => {
  const ticketingSystemState = new TicketingSystemState();

  it('Be able to render the correct amount of ticket holder detail forms', () => {
    const seatingState = new SeatingState(5);
    mobx.action(() => {
      seatingState.selectedSeats = ['10'];
    })();

    const { CheckoutElement } = createCheckout(
      seatingState,
      ticketingSystemState,
      jest.fn(),
      jest.fn()
    );

    const { getAllByRole } = render(<CheckoutElement />);
    const inputs = getAllByRole('textbox');

    expect(inputs.length).toBe(6);
  });

  it('Be able to advance when details are entered', () => {
    const mockRetract = jest.fn();
    const mockAdvance = jest.fn();

    const seatingState = new SeatingState(5);
    mobx.action(() => {
      seatingState.selectedSeats = ['10'];
    })();

    const { CheckoutElement } = createCheckout(
      seatingState,
      ticketingSystemState,
      mockRetract,
      mockAdvance
    );

    const { getAllByRole } = render(<CheckoutElement />);
    const inputs = getAllByRole('textbox');
    const buttons = getAllByRole('button');

    userEvent.click(buttons[0]);
    expect(mockAdvance).not.toBeCalled();

    userEvent.type(inputs[0], 'Bob Smith');
    userEvent.type(inputs[1], 'bob@example.com');
    userEvent.type(inputs[2], '12345678');

    userEvent.type(inputs[3], 'John Smith');
    userEvent.type(inputs[4], '0123');
    userEvent.type(inputs[5], '12345678');

    userEvent.click(buttons[1]);
    expect(mockAdvance).toBeCalled();
  });
});
