import React from 'react';
import { Button, Icon, Header, Form, Input } from 'semantic-ui-react';

import { observer } from 'mobx-react-lite';

export interface Props {
  index: number;
  details: ITicketDetails;
  description: string;
  showErrors: boolean;
  onChange(name: string, value: string): void;
};

interface OnChangeArgs {
  name: string;
  value: string;
};

function TicketholderDetails(props: Props) {
  const { description, index } = props;
  const { name, postcode, phone, seatNum } = props.details;

  const isNameInvalid = props.showErrors && !name.trim();
  const isPostcodeInvalid = props.showErrors && !/^\d{4}$/.test(postcode);

  function onChange(_: Event, { name, value }: OnChangeArgs) {
    props.onChange(name, value);
  }

  return (
    <React.Fragment>
      <Header as='h3'>Ticket #{index + 1}: {description} ({seatNum})</Header>
      <Form size="small">
        <Form.Input
          label='Name'
          name='name'
          onChange={onChange}
          defaultValue={props.name}
          error={isNameInvalid}
          required
        />
        <Form.Input
          label='Postcode (home)'
          name='postcode'
          onChange={onChange}
          defaultValue={props.postcode}
          error={isPostcodeInvalid}
          required
        />
        <Form.Input
          label='Phone (optional)'
          name='phone'
          onChange={onChange}
          defaultValue={props.phone}
        />
      </Form>
    </React.Fragment>
  );
};

export default observer(TicketholderDetails);
