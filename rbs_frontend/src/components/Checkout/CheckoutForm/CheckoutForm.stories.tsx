import React from 'react';
import { createCheckoutForm } from './create';

export default {
  title: 'Component/Checkout/CheckoutForm',
};

export const Default = () => {
  const { CheckoutFormElement } = createCheckoutForm();

  return <CheckoutFormElement />;
};
