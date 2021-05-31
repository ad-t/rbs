import React from 'react';
import { Header, Form } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { ITicketDetails } from 'src/types/tickets';

export interface TicketHolderFormProps {
  index: number;
  details: ITicketDetails;
  description: string;
  inputName: JSX.Element;
  inputPostcode: JSX.Element;
  inputPhone: JSX.Element;
}

export const TicketHolderForm = observer(function TicketHolderForm({
  description,
  details,
  index,
  inputName,
  inputPostcode,
  inputPhone,
}: TicketHolderFormProps) {
  const { seatNum } = details;

  return (
    <React.Fragment>
      <Header as="h3">
        Ticket #{index + 1}: {description} ({seatNum})
      </Header>
      <Form size="small">
        {inputName}
        {inputPostcode}
        {inputPhone}
      </Form>
    </React.Fragment>
  );
});
