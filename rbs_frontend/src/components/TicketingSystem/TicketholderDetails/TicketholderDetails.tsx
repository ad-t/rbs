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
  onNameChange(name: string): void;
  onPostcodeChange(postcode: string): void;
  onPhoneChange(phone: string): void;
};

interface State {};

export default class TicketholderDetails extends React.Component<Props, State> {
  onNameChange(name: string) {
    this.props.onNameChange(name);
  }

  onPostcodeChange(postcode: string) {
    this.props.onPhoneChange(postcode);
  }

  onPhoneChange(phone: string) {
    this.props.onPhoneChange(phone);
  }

  constructor(props: Props) {
    super(props);
    this.onNameChange = this.onNameChange.bind(this);
    this.onPhoneChange = this.onPhoneChange.bind(this);
    this.onPostcodeChange = this.onPostcodeChange.bind(this);
  }

  render() {
    const { name, phone, index, description, seatNum } = this.props;

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
            onChange={this.onNameChange}
            defaultValue={this.props.name}
            required
          />
          <Form.Field
            id='form-input-control-postcode'
            control={Input}
            label='Postcode (home)'
            name='postcode'
            onChange={this.onPostcodeChange}
            defaultValue={this.props.postcode}
            required
          />
          <Form.Field
            id='form-input-control-phone'
            control={Input}
            label='Phone (optional)'
            name='phone'
            onChange={this.onPhoneChange}
            defaultValue={this.props.phone}
          />
        </Form>
      </React.Fragment>
    );
  }
};
