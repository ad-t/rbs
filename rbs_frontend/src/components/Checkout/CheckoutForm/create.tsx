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

    return (
      <Form.Input
        label="Name"
        name="name"
        onChange={handleChange}
        value={checkoutFormState.name}
        error={
          checkoutFormState.hasClickedPayment && !checkoutFormState.name.trim()
        }
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

    return (
      <Form.Input
        label="Email"
        name="email"
        onChange={handleChange}
        value={checkoutFormState.email}
        error={
          checkoutFormState.hasClickedPayment &&
          !/^\S+@\S+$/.test(checkoutFormState.email)
        }
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

    return (
      <Form.Input
        label="Phone"
        name="phone"
        onChange={handleChange}
        value={checkoutFormState.phone}
        error={
          checkoutFormState.hasClickedPayment && !checkoutFormState.phone.trim()
        }
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
