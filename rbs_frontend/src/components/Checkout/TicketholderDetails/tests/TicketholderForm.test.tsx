import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createTicketholderDetailsForm } from '../create';

describe('Testing <TicketHolderForm />', () => {
  it('Be able to update details as they are typed in', () => {
    const {
      TicketHolderFormElement,
      ticketHolderFormState,
    } = createTicketholderDetailsForm({
      index: 0,
      seatNum: '1000',
    });

    const { getAllByRole } = render(<TicketHolderFormElement />);

    const inputs = getAllByRole('textbox');

    expect(ticketHolderFormState.name).toBe('');
    userEvent.type(inputs[0], 'Bob Jane');
    expect(ticketHolderFormState.name).toBe('Bob Jane');

    expect(ticketHolderFormState.postcode).toBe('');
    userEvent.type(inputs[1], '2000');
    expect(ticketHolderFormState.postcode).toBe('2000');

    expect(ticketHolderFormState.phone).toBe('');
    userEvent.type(inputs[2], '0491570006');
    expect(ticketHolderFormState.phone).toBe('0491570006');
  });

  it('Be able to validate name', () => {
    const {
      TicketHolderFormElement,
      ticketHolderFormState,
    } = createTicketholderDetailsForm({
      index: 0,
      seatNum: '1000',
    });

    const { getAllByRole } = render(<TicketHolderFormElement />);

    const inputs = getAllByRole('textbox');

    expect(ticketHolderFormState.isNameValid()).toBe(false);
    userEvent.type(inputs[0], 'Bob Smith');
    expect(ticketHolderFormState.isNameValid()).toBe(true);
  });

  it('Be able to validate postcode', () => {
    const {
      TicketHolderFormElement,
      ticketHolderFormState,
    } = createTicketholderDetailsForm({
      index: 0,
      seatNum: '1000',
    });

    const { getAllByRole } = render(<TicketHolderFormElement />);

    const inputs = getAllByRole('textbox');

    expect(ticketHolderFormState.isPostcodeValid()).toBe(false);
    userEvent.type(inputs[1], '1234');
    expect(ticketHolderFormState.isPostcodeValid()).toBe(true);
    userEvent.type(inputs[1], 'abcd');
    expect(ticketHolderFormState.isPostcodeValid()).toBe(false);
  });
});
