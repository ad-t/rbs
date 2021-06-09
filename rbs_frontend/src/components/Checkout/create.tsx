/*
 * This component will return an invoice that shows what tickets were purchased from the user.
 */
import React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { Button, Icon } from 'semantic-ui-react';
import { createCheckoutForm } from 'src/components/Checkout/CheckoutForm/create';
import { createTicketholderDetailsForm } from 'src/components/Checkout/TicketholderDetails/create';
import TicketNoControl from 'src/components/TicketNoControl/TicketNoControl';
import { TicketingSystemState } from 'src/components/TicketingSystem/TicketingSystem.state';
import SeatingState from 'src/components/Seating/Seating.state';
import SquareButton from 'src/components/SquareButton/SquareButton';
import { CheckoutState } from './Checkout.state';
import Checkout from './Checkout';

export function createCheckout(
  seatingState: SeatingState,
  ticketingSystemState: TicketingSystemState,
  retract: () => void,
  advance: () => void
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
      ticketHolderDetailsForms.push(<TicketHolderFormElement key={index} />);
    });

    ticketingSystemState.ticketStates.forEach((state, index) => {
      ticketQuantities.push(
        <TicketNoControl
          key={index}
          index={index}
          cost={state.cost}
          description={state.name}
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
        RetreatElement={
          <Button icon labelPosition="left" onClick={retract}>
            <Icon name="arrow left" />
            Select seats
          </Button>
        }
        CheckoutElement={
          <SquareButton setupSquare={setupSquare} onSquareApprove={advance} />
        }
      />
    );
  });

  return {
    CheckoutElement,
    checkoutState,
  };
}
