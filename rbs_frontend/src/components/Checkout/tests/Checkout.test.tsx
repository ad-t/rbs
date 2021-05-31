import React from 'react';
import { observable, action as mobxAction } from 'mobx';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import createCheckout from '../create';
import ITicketDetails from 'src/types/ticket';


const tickets: ITicket[] = observable([{
  id: 1,
  price: 20,
  description: 'General',
  minPurchaseAmount: 1,
  quantity: 1,
}]);

const ticketDetails: ITicketDetails[] = observable([{
  typeId: 1,
  name: '',
  postcode: '',
  phone: '',
  seatNum: 'r1c2s3',
}]);

const info = {
  selectedShow: 1,
  tickets,
  ticketDetails,
  discount: null
};

describe('Testing <Checkout />', () => {
  it('Be able to update details as they are typed in', () => {
    const mockUpdateTicketDetails = jest.fn();
    const mockUpdatePayment = jest.fn();

    const checkout = createCheckout({
      ...info,
      updatePayment: mobxAction(mockUpdatePayment),
    });
    const { getAllByRole } = render(
      <checkout.Checkout />
    );

    const inputs = getAllByRole('textbox');

    userEvent.type(inputs[3], 'Bob Jane');
    expect(ticketDetails[0].name).toEqual('Bob Jane');
    userEvent.type(inputs[4], '2000');
    expect(ticketDetails[0].postcode).toEqual('2000');
    userEvent.type(inputs[5], '0491570006');
    expect(ticketDetails[0].phone).toEqual('0491570006');
  });

  it('Shows error on invalid postcode', () => {
    const mockUpdatePayment = jest.fn();

    const details: ITicketDetails = observable({
      name: 'Hello',
      postcode: '',
      phone: '',
      seatNum: 'r1c3s4',
    });

    const checkout = createCheckout({
      ...info,
      ticketDetails: details,
      updatePayment: mobxAction(mockUpdatePayment),
    });
    checkout.state.hasClickedPayment = true;
    const { getAllByRole } = render(
      <checkout.Checkout />
    );

    const inputs = getAllByRole('textbox');

    userEvent.type(inputs[1], 'skldfjalsjdfsaf');
    expect(inputs[1]).toBeInvalid();
  });
});
