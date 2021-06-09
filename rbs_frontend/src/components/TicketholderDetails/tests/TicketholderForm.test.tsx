import React from 'react';
import { observable, action as mobxAction } from 'mobx';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TicketholderDetails from '../TicketHolderForm';
import ITicketDetails from 'src/types/ticket';

const info = {
  index: 2,
  description: 'Arc',
  showErrors: true,
};

describe('Testing <TicketholderDetails />', () => {
  it('Be able to update details as they are typed in', () => {
    const mockOnChange = jest.fn();

    const details: ITicketDetails = observable({
      name: 'Hello',
      postcode: '',
      phone: '',
      seatNum: 'r1c3s4',
    });

    const { getAllByRole } = render(
      <TicketholderDetails
        {...info}
        details={details}
        onChange={mobxAction(mockOnChange)}
      />
    );

    const inputs = getAllByRole('textbox');

    userEvent.type(inputs[0], 'Bob Jane');
    expect(mockOnChange).toBeCalledWith('name', 'Bob Jane');
    userEvent.type(inputs[1], '2000');
    expect(mockOnChange).toBeCalledWith('postcode', '2000');
    userEvent.type(inputs[2], '0491570006');
    expect(mockOnChange).toBeCalledWith('phone', '0491570006');
  });

  it('Shows error on invalid postcode', () => {
    const mockOnChange = jest.fn();

    const details: ITicketDetails = observable({
      name: 'Hello',
      postcode: '',
      phone: '',
      seatNum: 'r1c3s4',
    });

    const { getAllByRole } = render(
      <TicketholderDetails
        {...info}
        details={details}
        onChange={mobxAction(mockOnChange)}
      />
    );

    const inputs = getAllByRole('textbox');

    userEvent.type(inputs[1], 'skldfjalsjdfsaf');
    expect(inputs[1]).toBeInvalid();
  });
});
