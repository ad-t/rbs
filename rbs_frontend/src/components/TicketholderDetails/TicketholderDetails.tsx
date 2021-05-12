/*
 * This file will handle the entire landing page.
 */
import React from 'react';
import { Button, Icon, Header, Form, Input } from 'semantic-ui-react';

interface Props {
  index: number;
  name: string;
  postcode: string;
  phone: string;
  seatNum: string;
  description: string;
  showErrors: boolean;
  onNameChange(name: string): void;
  onPostcodeChange(postcode: string): void;
  onPhoneChange(phone: string): void;
};

export default function TicketholderDetails(props: Props) {
  const isNameInvalid = props.showErrors && !props.name.trim();
  const isPostcodeInvalid = props.showErrors && !/^\d{4}$/.test(props.postcode);

  function onNameChange(_: Event, { value }: any) {
    props.onNameChange(value);
  }

  function onPostcodeChange(_: Event, { value }: any) {
    props.onPostcodeChange(value);
  }

  function onPhoneChange(_: Event, { value }: any) {
    props.onPhoneChange(value);
  }

  const { name, phone, index, description, seatNum } = props;

  return (
    <React.Fragment>
      <Header as='h3'>Ticket #{index + 1}: {description} ({seatNum})</Header>
      {/* TODO: field validation */}
      <Form size="small">
        <Form.Field
          id='form-input-control-name'
          control={Input}
          label='Name'
          name='name'
          onChange={onNameChange}
          defaultValue={props.name}
          error={isNameInvalid}
          required
        />
        <Form.Field
          id='form-input-control-postcode'
          control={Input}
          label='Postcode (home)'
          name='postcode'
          onChange={onPostcodeChange}
          defaultValue={props.postcode}
          error={isPostcodeInvalid}
          required
        />
        <Form.Field
          id='form-input-control-phone'
          control={Input}
          label='Phone (optional)'
          name='phone'
          onChange={onPhoneChange}
          defaultValue={props.phone}
        />
      </Form>
    </React.Fragment>
  );
};
