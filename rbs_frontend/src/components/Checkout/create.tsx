/*
 * This component will return an invoice that shows what tickets were purchased from the user.
 */
import React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { createCheckoutForm } from 'src/components/Checkout/CheckoutForm/create';
import { createTicketholderDetailsForm } from 'src/components/TicketholderDetails/create';
import { TicketingSystemState } from 'src/components/TicketingSystem/TicketingSystem.state';
import SquareButton from 'src/components/SquareButton/SquareButton';
import { CheckoutState } from './Checkout.state';
import Checkout from './Checkout';

export function createCheckout(ticketingSystemState: TicketingSystemState) {
  const checkoutState = new CheckoutState();
  const { CheckoutFormElement, checkoutFormState } = createCheckoutForm();
  checkoutState.setCheckoutFormState(checkoutFormState);

  const CheckoutElement = mobxReact.observer(() => {
    const ticketHolderDetailsForms = ticketingSystemState.ticketStates.map(
      (_, index) => {
        const {
          TicketHolderFormElement,
          ticketHolderFormState,
        } = createTicketholderDetailsForm({
          index,
          description: 'Ticket',
          seatNum: '1000',
        });
        checkoutState.addTicketDetailsState(ticketHolderFormState);
        return <TicketHolderFormElement />;
      }
    );

    const totalPrice = ticketingSystemState.ticketStates.reduce(
      (total, state) => (total += state.cost * state.value),
      0
    );

    return (
      <Checkout
        discount={null}
        totalPrice={totalPrice}
        checkoutForm={<CheckoutFormElement />}
        ticketDetailsForms={ticketHolderDetailsForms}
        checkoutElement={
          <SquareButton
            setupSquare={() => {
              return Promise.resolve('https://www.google.com');
            }}
          />
        }
      />
    );
  });

  return {
    CheckoutElement,
    checkoutState,
  };
}
