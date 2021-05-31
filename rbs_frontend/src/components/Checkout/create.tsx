/*
 * This component will return an invoice that shows what tickets were purchased from the user.
 */
import React from 'react';
import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react-lite';
import { ToastError } from 'src/shared/errors';

import CheckoutState from './Checkout.state';
import Checkout, { CheckoutProps } from './Checkout';

export type CheckoutConfig = Omit<CheckoutProps, 'state'>;

export default function createCheckout(props: CheckoutConfig) {
  const checkoutState = new CheckoutState();

  const checkoutElement = mobxReact.observer(() => {
    return <Checkout {...props} state={checkoutState} />;
  });

  return {
    Checkout: checkoutElement,
    state: checkoutState,
  };
}
