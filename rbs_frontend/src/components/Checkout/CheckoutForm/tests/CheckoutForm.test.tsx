import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createCheckoutForm } from '../create';

describe('Testing <CheckoutFormElement />', () => {
  it('Be able to update details as they are typed in', () => {
    const { CheckoutFormElement, checkoutFormState } = createCheckoutForm();

    const { getAllByRole } = render(<CheckoutFormElement />);

    const inputs = getAllByRole('textbox');

    expect(checkoutFormState.name).toBe('');
    userEvent.type(inputs[0], 'Bob Jane');
    expect(checkoutFormState.name).toBe('Bob Jane');

    expect(checkoutFormState.email).toBe('');
    userEvent.type(inputs[1], 'test@example.com');
    expect(checkoutFormState.email).toBe('test@example.com');

    expect(checkoutFormState.phone).toBe('');
    userEvent.type(inputs[2], '0491570006');
    expect(checkoutFormState.phone).toBe('0491570006');
  });

  it('Be able to validate name', () => {
    const { CheckoutFormElement, checkoutFormState } = createCheckoutForm();

    const { getAllByRole } = render(<CheckoutFormElement />);

    const inputs = getAllByRole('textbox');

    expect(checkoutFormState.isNameValid()).toBe(false);
    userEvent.type(inputs[0], 'Bob Smith');
    expect(checkoutFormState.isNameValid()).toBe(true);
  });

  it('Be able to validate email', () => {
    const { CheckoutFormElement, checkoutFormState } = createCheckoutForm();

    const { getAllByRole } = render(<CheckoutFormElement />);

    const inputs = getAllByRole('textbox');

    expect(checkoutFormState.isEmailValid()).toBe(false);
    userEvent.type(inputs[1], 'test');
    expect(checkoutFormState.isEmailValid()).toBe(false);
    userEvent.type(inputs[1], 'test@example.com');
    expect(checkoutFormState.isEmailValid()).toBe(true);
  });

  it('Be able to validate phone number', () => {
    const { CheckoutFormElement, checkoutFormState } = createCheckoutForm();

    const { getAllByRole } = render(<CheckoutFormElement />);

    const inputs = getAllByRole('textbox');

    expect(checkoutFormState.isPhoneValid()).toBe(false);
    userEvent.type(inputs[2], '0123');
    expect(checkoutFormState.isPhoneValid()).toBe(true);
    userEvent.type(inputs[2], 'abcd');
    expect(checkoutFormState.isPhoneValid()).toBe(false);
  });
});
