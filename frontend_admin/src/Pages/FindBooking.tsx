import React from 'react';
import {
  Container,
  Header,
  Form,
  Radio,
  CheckboxProps,
} from 'semantic-ui-react';
import { Ticket } from 'src/shared/types';
import { OrderIDMethod } from 'src/Components/CheckIn/OrderID';
import { QRCodeMethod } from 'src/Components/CheckIn/QRCodeMethod';
import { TicketIDMethod } from 'src/Components/CheckIn/TicketID';

interface State {
  tickets: Ticket[];
  inputMethod: string;
}

class FindBooking extends React.Component<{}, State> {
  state = {
    tickets: [] as Ticket[],
    inputMethod: 'id',
  };

  handleChange = (
    e: React.FormEvent<HTMLInputElement>,
    { value }: CheckboxProps
  ) => this.setState({ inputMethod: value?.toString() || '' });

  render() {
    const { inputMethod } = this.state;

    let entryInput;
    if (inputMethod === 'qr') {
      entryInput = <QRCodeMethod />;
    } else if (inputMethod === 'order_id') {
      entryInput = <OrderIDMethod />;
    } else {
      entryInput = <TicketIDMethod />;
    }

    return (
      <Container text style={{ marginTop: '7em' }}>
        <Header as="h1">Check In Ticket</Header>

        <p>Find by:</p>
        <Form>
          <Form.Field>
            <Radio
              label="Ticket ID"
              name="radioGroup"
              value="id"
              checked={inputMethod === 'id'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="Order ID"
              name="radioGroup"
              value="order_id"
              checked={inputMethod === 'order_id'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="QR Code"
              name="radioGroup"
              value="qr"
              checked={inputMethod === 'qr'}
              onChange={this.handleChange}
            />
          </Form.Field>
        </Form>

        <div style={{ marginTop: '0.8em' }}>{entryInput}</div>
      </Container>
    );
  }
}

export default FindBooking;
