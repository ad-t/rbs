import * as React from 'react';
import { Form, Header } from 'semantic-ui-react';

interface CheckoutFormProps {
  inputName: JSX.Element;
  inputEmail: JSX.Element;
  inputPhone: JSX.Element;
}

export function CheckoutForm({
  inputName,
  inputEmail,
  inputPhone,
}: CheckoutFormProps) {
  return (
    <>
      <Header as="h2">Purchaser Details</Header>
      <Form>
        {inputName}
        {inputEmail}
        {inputPhone}
      </Form>
    </>
  );
}
