/*
 * This component will return an invoice that shows what tickets were purchased from the user.
 */
import React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { createCheckoutForm } from 'src/components/Checkout/CheckoutForm/create';
import { createTicketholderDetailsForm } from 'src/components/TicketholderDetails/create';
import TicketNoControl from 'src/components/TicketNoControl/TicketNoControl';
import { TicketingSystemState } from 'src/components/TicketingSystem/TicketingSystem.state';
import SeatingState from 'src/components/Seating/Seating.state';
import SquareButton from 'src/components/SquareButton/SquareButton';
import { CheckoutState } from './Checkout.state';
import Checkout from './Checkout';

export function createCheckout(
  seatingState: SeatingState,
  ticketingSystemState: TicketingSystemState
) {
  const checkoutState = new CheckoutState();
  const { CheckoutFormElement, checkoutFormState } = createCheckoutForm();
  checkoutState.setCheckoutFormState(checkoutFormState);

  const CheckoutElement = mobxReact.observer(() => {
    let totalPrice = 0;
    const ticketHolderDetailsForms: JSX.Element[] = [];
    const ticketQuantities: JSX.Element[] = [];

    seatingState.selectedSeats.forEach((seatId, index) => {
      const {
        TicketHolderFormElement,
        ticketHolderFormState,
      } = createTicketholderDetailsForm({
        index,
        description: 'Ticket',
        seatNum: seatId,
      });

      checkoutState.addTicketDetailsState(ticketHolderFormState);
      ticketHolderDetailsForms.push(<TicketHolderFormElement />);
    });

    ticketingSystemState.ticketStates.forEach((state, index) => {
      ticketQuantities.push(
        <TicketNoControl
          index={index}
          cost={state.cost}
          description="Ticket"
          quantity={state.value}
        />
      );
      totalPrice += state.cost * state.value;
    });

    async function setupSquare() {
      const isValid = checkoutFormState.validate();
      const ticketHoldersFormValid = checkoutState.ticketDetailStates.reduce(
        (prev, state) => prev && state.validate(),
        true
      );

      if (isValid && ticketHoldersFormValid) {
        return Promise.resolve('https://www.google.com');
      }

      return Promise.resolve(null);
    }

    return (
      <Checkout
        discount={null}
        totalPrice={totalPrice}
        checkoutForm={<CheckoutFormElement />}
        ticketDetailsForms={ticketHolderDetailsForms}
        ticketQuantitiesElement={ticketQuantities}
        checkoutElement={<SquareButton setupSquare={setupSquare} />}
      />
    );
  });

  return {
    CheckoutElement,
    checkoutState,
  };
}
