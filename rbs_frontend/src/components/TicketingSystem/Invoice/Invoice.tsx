/*
 * This component will return an invoice that shows what tickets were purchased from the user.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Icon } from 'semantic-ui-react';

// Import our interface
import { ITicket } from '../../../types/tickets';

declare var paypal : any;
const PayPalButton = paypal.Buttons.driver('react', { React, ReactDOM });

interface Prop {
  selectedShow: number;
  tickets: Array<ITicket>;
  updatePayment(details: any): void;
}

interface State {
  orderID: string;
}

export default class Ticket extends React.Component<Prop, State> {
  state = {
    orderID: ''
  }

  async createOrder() {
    const orderRes = await fetch(`${process.env.REACT_APP_API_URL}/shows/${this.props.selectedShow}/seats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // TODO: collect user details
      body: JSON.stringify({
        "name": "John Smith",
        "email": "john@example.com",
        "phone": "0412345678",
        "numSeats": this.props.tickets[0].quantity,
        "ticketType": this.props.tickets[0].id
      })
    });

    const data = await orderRes.json();
    this.state.orderID = data.id;

    const setupRes = await fetch(`${process.env.REACT_APP_API_URL}/orders/${data.id}/paypal-setup`, {
      method: 'POST'
    });
    const setup = await setupRes.json();
    return setup.paypalOrderID;
  }

  private paypalFee(price: number) {
    return price * 1.026 + 0.30;
  }

  async onApprove(data: any, actions: any) {
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
      this.props.updatePayment({});
    } else {
      const text = await verify.text()
      alert(verify.status + ': ' + text);
    }
  }

  render() {
    const { tickets } = this.props;
    const { name, email, phone, showTickets } = this.state;
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
      <div className="btn-show-nights" style={{margin: '1em auto', width: '25%'}}>
        <PayPalButton
          createOrder={ () => this.createOrder() }
          onApprove={ (data: any, actions: any) => this.onApprove(data, actions) }
        ></PayPalButton>
      </div>
    );
  }
};
