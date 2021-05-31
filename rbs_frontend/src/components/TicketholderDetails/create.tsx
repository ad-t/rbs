import * as React from 'react';
import { Form } from 'semantic-ui-react';
import * as mobxReact from 'mobx-react-lite';
import { TicketHolderForm, TicketHolderFormProps } from './TicketHolderForm';
import { TicketHolderFormState } from './TicketHolderForm.state';

type Parameters = Omit<
  TicketHolderFormProps,
  'inputName' | 'inputPostcode' | 'inputPhone'
>;

export function createTicketholderDetailsForm(parameters: Parameters) {
  const ticketHolderFormState = new TicketHolderFormState();

  const InputName = mobxReact.observer(() => {
    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        ticketHolderFormState.updateName(event.currentTarget.value);
      },
      []
    );

    return (
      <Form.Input
        label="Name"
        name="name"
        onChange={handleChange}
        value={ticketHolderFormState.name}
        required
      />
    );
  });

  const InputPostcode = mobxReact.observer(() => {
    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        ticketHolderFormState.updatePostcode(event.currentTarget.value);
      },
      []
    );

    return (
      <Form.Input
        label="Postcode (home)"
        name="postcode"
        onChange={handleChange}
        value={ticketHolderFormState.postcode}
        required
      />
    );
  });

  const InputPhone = mobxReact.observer(() => {
    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        ticketHolderFormState.updatePhone(event.currentTarget.value);
      },
      []
    );

    return (
      <Form.Input
        label="Phone (optional)"
        name="phone"
        onChange={handleChange}
        value={ticketHolderFormState.phone}
      />
    );
  });

  const TicketHolderFormElement = mobxReact.observer(() => (
    <TicketHolderForm
      {...parameters}
      inputName={<InputName />}
      inputPostcode={<InputPostcode />}
      inputPhone={<InputPhone />}
    />
  ));

  return { TicketHolderFormElement, ticketHolderFormState };
}
