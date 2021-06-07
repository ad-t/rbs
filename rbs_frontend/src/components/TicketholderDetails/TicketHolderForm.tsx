import React from 'react';
import { Header, Form } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';

export interface TicketHolderFormProps {
  index: number;
  description: string;
  seatNum: string;
  inputName: JSX.Element;
  inputPostcode: JSX.Element;
  inputPhone: JSX.Element;
}

export const TicketHolderForm = observer(function TicketHolderForm({
  index,
  description,
  seatNum,
  inputName,
  inputPostcode,
  inputPhone,
}: TicketHolderFormProps) {
  return (
    <React.Fragment>
      <Header as="h3">
        Ticket #{index + 1}: {description} (Seat: {seatNum})
      </Header>
      <Form size="small">
        {inputName}
        {inputPostcode}
        {inputPhone}
      </Form>
    </React.Fragment>
  );
});
