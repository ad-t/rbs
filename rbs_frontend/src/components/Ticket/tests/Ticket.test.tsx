import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Ticket from '../Ticket';

const ticketInfo = {
  id: '0',
  name: 'Ticket',
  cost: 10,
  minPurchase: 0,
};

describe('Testing <Ticket />', () => {
  it('Be able to increment ticket number and decrement when amount is above 0', () => {
    const mockUpdateTickets = jest.fn();

    const { getAllByRole } = render(
      <Ticket
        {...ticketInfo}
        ticketAmount={1}
        updateTickets={mockUpdateTickets}
      />
    );

    const btns = getAllByRole('button');

    userEvent.click(btns[1]);
    expect(mockUpdateTickets).toBeCalledWith(2);
    userEvent.click(btns[0]);
    expect(mockUpdateTickets).toBeCalledWith(0);
  });

  it('Be able to increment ticket number but not decrement on 0', () => {
    const mockUpdateTickets = jest.fn();

    const { getAllByRole } = render(
      <Ticket
        {...ticketInfo}
        ticketAmount={0}
        updateTickets={mockUpdateTickets}
      />
    );

    const btns = getAllByRole('button');

    userEvent.click(btns[1]);
    expect(mockUpdateTickets).toBeCalledWith(1);
    userEvent.click(btns[0]);
    expect(mockUpdateTickets).not.toBeCalledWith(-1);
  });
});
