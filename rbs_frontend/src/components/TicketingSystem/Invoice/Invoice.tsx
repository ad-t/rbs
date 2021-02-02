/*
 * This component will return an invoice that shows what tickets were purchased from the user.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Divider, Form, Header, Icon, Input, Grid, Container } from 'semantic-ui-react';

import TicketNoControl from '../TicketNoControl';

// Import our interface
import { ITicket } from '../../../types/tickets';

import SquareButton from './SquareButton';

declare var paypal : any;
const PayPalButton = paypal.Buttons.driver('react', { React, ReactDOM });

interface Prop {
  selectedShow: number;
  tickets: Array<ITicket>;
  updatePayment(details: any): void;
}

interface State {
  orderID: string;
  name: string;
  email: string;
  phone: string;
  [key: string]: any;
}

export default class Ticket extends React.Component<Prop, State> {
  state = {
    orderID: '',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '0412345678'
  }

  async createOrder() {
    const seats = [];
    for (const ticket of this.props.tickets) {
      if (ticket.quantity > 0) {
        seats.push({
          numSeats: ticket.quantity,
          ticketType: ticket.id
        });
      }
    }

    // TODO: validate personal details
    const orderRes = await fetch(`${process.env.REACT_APP_API_URL}/shows/${this.props.selectedShow}/seats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": this.state.name,
        "email": this.state.email,
        "phone": this.state.phone,
        seats
      })
    });

    const data = await orderRes.json();
    this.state.orderID = data.id;

    const setupRes = await fetch(`${process.env.REACT_APP_API_URL}/orders/${data.id}/paypal-setup`, {
      method: 'POST'
    });
    const setup = await setupRes.json();
    console.log(setup.url);
    return setup.paypalOrderID;
  }

  async setupSquare() {
    const seats = [];
    for (const ticket of this.props.tickets) {
      if (ticket.quantity > 0) {
        seats.push({
          numSeats: ticket.quantity,
          ticketType: ticket.id
        });
      }
    }

    // TODO: validate personal details
    const orderRes = await fetch(`${process.env.REACT_APP_API_URL}/shows/${this.props.selectedShow}/seats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": this.state.name,
        "email": this.state.email,
        "phone": this.state.phone,
        seats
      })
    });

    const data = await orderRes.json();
    this.state.orderID = data.id;

    const setupRes = await fetch(`${process.env.REACT_APP_API_URL}/orders/${data.id}/square-setup`, {
      method: 'POST'
    });
    const setup = await setupRes.json();
    const win = window.open(setup.url, 'square-pay', 'toolbar=no');
    if (win) {
      const timer = setInterval(() => {
        if (win.closed) {
          clearInterval(timer);
          this.onSquareApprove();
        }
      }, 1000);
    }
    return setup.paypalOrderID;
  };

  private paypalFee(price: number) {
    return price * 0.026 + 0.30;
  }

  async onPaypalApprove(data: any, actions: any) {
    const verify = await fetch(`${process.env.REACT_APP_API_URL}/orders/${this.state.orderID}/paypal-capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "paypalOrderID": data.orderID
      })
    });

    if (verify.status === 200) {
      this.props.updatePayment({ orderID: this.state.orderID });
    } else {
      const text = await verify.text()
      alert(verify.status + ': ' + text);
    }
  }

  async onSquareApprove() {
    const verify = await fetch(`${process.env.REACT_APP_API_URL}/orders/${this.state.orderID}/square-verify-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });

    if (verify.status === 200) {
      this.props.updatePayment({ orderID: this.state.orderID });
    } else {
      const text = await verify.text()
      alert(verify.status + ': ' + text);
    }
  }

  handleChange = (e: any, { name , value }: any) => this.setState({ [name]: value })

  render() {
    const { tickets } = this.props;
    const { name, email, phone } = this.state;
    const ticketElms: Array<JSX.Element> = [];
    let totalPrice = 0;

    for (let i = 0; i < tickets.length; ++i) {
      const ticket: ITicket = tickets[i];
      ticketElms.push(
        <TicketNoControl
          key={i}
          index={i}
          cost={ticket.price}
          description={ticket.description}
          quantity={ticket.quantity}
        />
      );
      totalPrice += (ticket.quantity * ticket.price);
    }

    return (
      <React.Fragment>
        <div className="registration">
          <div className="personal-details">
            <Header as='h2'>Personal Details</Header>
            <Form>
              <Form.Field
                id='form-input-control-first-name'
                control={Input}
                label='Name'
                name='name'
                placeholder='John Smith'
                onChange={this.handleChange}
                defaultValue={this.state.name}
              />
              <Form.Field
                id='form-input-control-error-email'
                control={Input}
                label='Email'
                name='email'
                placeholder='john@example.com'
                onChange={this.handleChange}
                defaultValue={this.state.email}
              />
              <Form.Field
                id='form-input-control-phone'
                control={Input}
                label='Phone'
                name='phone'
                placeholder='0412345678'
                onChange={this.handleChange}
                defaultValue={this.state.phone}
              />
            </Form>
          </div>
          <div className="invoice">
            <Header as='h2'>Invoice</Header>
            <div className="tickets-list">
              {ticketElms}
            </div>
            <Divider style={{margin: '0em 1em'}}/>
            <div className="ticket-price">
              <div style={{marginBottom: '0.5em'}}>
                Subtotal: ${totalPrice.toFixed(2)}
              </div>
              <div style={{marginBottom: '0.5em'}}>
                Paypal fee: ${this.paypalFee(totalPrice).toFixed(2)}
              </div>
              <div>Total Cost: ${(totalPrice + this.paypalFee(totalPrice)).toFixed(2)}</div>
            </div>
          </div>
        </div>
        <Container className="payment-btn-group">
          <Grid stackable columns={4} centered>
            <Grid.Row>
              <Grid.Column>
                <SquareButton setupSquare={ () => this.setupSquare() } />
              </Grid.Column>
              <Grid.Column>
                <PayPalButton
                  createOrder={ () => this.createOrder() }
                  onApprove={ (data: any, actions: any) => this.onPaypalApprove(data, actions) }
                  fundingSource={ paypal.FUNDING.PAYPAL }
                  style={{ height: 45 }}
                ></PayPalButton>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                <p>No surcharge applies</p>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <p>0.41% + $0.30 surcharge applies for PayPal</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
};

