/*
 * This component will return an invoice that shows what tickets were purchased from the user.
 */
import React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { createCheckoutForm } from 'src/components/Checkout/CheckoutForm/create';
import CheckoutState from './Checkout.state';
import Checkout, { CheckoutProps } from './Checkout';

export type CheckoutConfig = Omit<CheckoutProps, 'state'>;

export default function createCheckout(props: CheckoutConfig) {
  const checkoutState = new CheckoutState();
  const { CheckoutFormElement } = createCheckoutForm();

  const checkoutElement = mobxReact.observer(() => {
    return (
      <Checkout
        {...props}
        checkoutForm={<CheckoutFormElement />}
        state={checkoutState}
      />
    );
  });

  return {
    Checkout: checkoutElement,
    state: checkoutState,
  };
}
