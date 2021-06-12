import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { Form } from 'semantic-ui-react';
import { CheckoutForm } from './CheckoutForm';
import { CheckoutFormState } from './CheckoutForm.state';

export function createCheckoutForm() {
  const checkoutFormState = new CheckoutFormState();

  const InputName = mobxReact.observer(() => {
    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        checkoutFormState.updateName(event.currentTarget.value);
      },
      []
    );

    const error =
      checkoutFormState.hasClickedPayment && !checkoutFormState.isNameValid()
        ? { content: 'Please enter a name', pointing: 'below' }
        : null;

    return (
      <Form.Input
        label="Name"
        name="name"
        onChange={handleChange}
        value={checkoutFormState.name}
        error={error}
        required
      />
    );
  });

  const InputEmail = mobxReact.observer(() => {
    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        checkoutFormState.updateEmail(event.currentTarget.value);
      },
      []
    );

    const error =
      checkoutFormState.hasClickedPayment && !checkoutFormState.isEmailValid()
        ? { content: 'Please enter a valid email address', pointing: 'below' }
        : null;

    return (
      <Form.Input
        label="Email"
        name="email"
        onChange={handleChange}
        value={checkoutFormState.email}
        error={error}
        required
      />
    );
  });

  const InputPhone = mobxReact.observer(() => {
    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        checkoutFormState.updatePhone(event.currentTarget.value);
      },
      []
    );

    const error =
      checkoutFormState.hasClickedPayment && !checkoutFormState.phone.trim()
        ? { content: 'Please enter a phone number', pointing: 'below' }
        : null;

    return (
      <Form.Input
        label="Phone"
        name="phone"
        onChange={handleChange}
        value={checkoutFormState.phone}
        error={error}
        required
      />
    );
  });

  const CheckoutFormElement = mobxReact.observer(() => (
    <CheckoutForm
      inputName={<InputName />}
      inputEmail={<InputEmail />}
      inputPhone={<InputPhone />}
    />
  ));

  return {
    CheckoutFormElement,
    checkoutFormState,
  };
}
