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
import { createSquareButton } from 'src/components/SquareButton/create';
import { getSquareCheckoutUrl } from 'src/mocks/squareService';
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

  const { SquareButtonElement, squareButtonState } = createSquareButton();

  function beginSquareProcessing() {
    const isValid = checkoutFormState.validate();
    const ticketHoldersFormValid = checkoutState.ticketDetailStates.reduce(
      (prev, state) => prev && state.validate(),
      true
    );

    if (!(isValid && ticketHoldersFormValid)) {
      return;
    }

    // NOTE: hack to work around Safari refusing to open popups that are
    // called asynchronously: https://stackoverflow.com/q/20696041/2074608
    const win = window.open(undefined, 'square-pay', 'toolbar=no');

    getSquareCheckoutUrl().then((url) => {
      if (!url) {
        win?.close();
        return;
      }

      /* NOTE: hack to detect window closed without CORS */
      if (win) {
        squareButtonState.openModal();
        win.location.replace(url);
        const timer = setInterval(() => {
          if (win.closed) {
            clearInterval(timer);
            // TODO: can we track on frontend if paid before getting backend
            // to check?
            advance();
          }
        }, 1000);
      }
    });
  }

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
          <SquareButtonElement onClick={beginSquareProcessing} />
        }
      />
    );
  });

  return {
    CheckoutElement,
    checkoutState,
  };
}
