import * as React from 'react';
import { Form, Header, Message } from 'semantic-ui-react';

interface CheckoutFormProps {
  inputName: JSX.Element;
  inputEmail: JSX.Element;
  inputPhone: JSX.Element;
  error?: boolean;
}

export function CheckoutForm({
  inputName,
  inputEmail,
  inputPhone,
  error,
}: CheckoutFormProps) {
  return (
    <>
      <Header as="h2">Purchaser Details</Header>
      <Form>
        {inputName}
        {inputEmail}
        {inputPhone}
      </Form>
      {error && (
        <Message color="red">
          Incomplete details, please fill all fields to continue.
        </Message>
      )}
    </>
  );
}
