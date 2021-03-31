/*
 * This component will return an invoice that shows what tickets were purchased from the user.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Divider, Form, Header, Icon, Input, Grid, Container, List, Popup, Message } from 'semantic-ui-react';

import TicketNoControl from '../TicketNoControl';
import TicketholderDetails from '../TicketholderDetails';

// Import our interface
import { ITicket, ITicketDetails } from '../../../types/tickets';

import SquareButton from './SquareButton';

declare var paypal : any;
const PayPalButton = paypal.Buttons.driver('react', { React, ReactDOM });

interface Prop {
  selectedShow: number;
  tickets: ITicket[];
  ticketDetails: ITicketDetails[];
  updateTicketDetails(tickets: ITicketDetails[]): void;
  updatePayment(details: any): void;
}

interface State {
  orderID: string;
  name: string;
  email: string;
  phone: string;
  [key: string]: any;
  hasClickedPayment: boolean;
}

export default class Ticket extends React.Component<Prop, State> {
  state = {
    orderID: '',
//     name: 'John Smith',
//     email: 'john@example.com',
//     phone: '0412345678'
    name: '',
    email: '',
    phone: '',
    hasClickedPayment: false
  }

  constructor(props: Prop) {
    super(props);
  }

  async reserveSeats() {
    let valid = !!(this.state.name && this.state.email && this.state.phone);

    for (const details of this.props.ticketDetails) {
      if (!details.name || !details.postcode) {
        valid = false;
      }
    }

    if (!valid) {
      alert("Please fill out all ticketholder details.");
      throw new Error('invalid details');
    }

    const seats = [];
    for (const ticket of this.props.tickets) {
      const details = this.props.ticketDetails.filter(x => x.typeId === ticket.id)
      if (details.length) {
        seats.push({
          details,
          ticketType: ticket.id
        });
      }
    }

    // TODO: validate personal details
    const result = await fetch(`${process.env.REACT_APP_API_URL}/shows/${this.props.selectedShow}/seats`, {
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

    if (!result.ok) {
      const text = await result.text();
      alert(result.status + ': ' + text);
      throw new Error(result.status + ': ' + text);
    }

    return result;
  }

  createOrder = async () => {
    let id = this.state.orderID;
    if (!id) {
      let orderRes;
      try {
        orderRes = await this.reserveSeats();
      } catch (e) {
        console.error(e);
        return null;
      }
      const data = await orderRes.json();
      id = data.id;
      this.setState({orderID: id});
    }

    const setupRes = await fetch(`${process.env.REACT_APP_API_URL}/orders/${id}/paypal-setup`, {
      method: 'POST'
    });
    const setup = await setupRes.json();
    return setup.paypalOrderID;
  }

  async setupSquare() {
    const win = window.open(undefined, 'square-pay', 'toolbar=no');;
    let id = this.state.orderID;
    if (!id) {
      let orderRes;
      try {
        orderRes = await this.reserveSeats();
      } catch (e) {
        console.error(e);
        if (win) win.close();
        return null;
      }
      const data = await orderRes.json();
      id = data.id;
      this.setState({orderID: id});
    }

    const setupRes = await fetch(`${process.env.REACT_APP_API_URL}/orders/${id}/square-setup`, {
      method: 'POST'
    });
    const setup = await setupRes.json();
    /* NOTE: hack to detect window closed without CORS */
    // FIXME: detect if paid or not

    if (win) {
      win.location = setup.url;
      const timer = setInterval(() => {
        if (win.closed) {
          clearInterval(timer);
          this.onSquareApprove();
        }
      }, 1000);
    }
    return setup.paypalOrderID;
  };

  private handlingFee(price: number) {
    return 2.19;
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
      this.props.updatePayment({ tickets: this.props.tickets, orderID: this.state.orderID, email: this.state.email });
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
      this.props.updatePayment({ orderID: this.state.orderID, email: this.state.email });
    } else {
      const text = await verify.text()
      // FIXME: use better UI
      alert(verify.status + ': ' + text);
    }
  }

  handleChange = (e: any, { name , value }: any) => this.setState({ [name]: value })

  render() {
    const { tickets, ticketDetails } = this.props;
    const { name, email, phone, hasClickedPayment } = this.state;
    const ticketElms: Array<JSX.Element> = [];
    let totalPrice = 0;

    for (let i = 0; i < tickets.length; ++i) {
      const ticket: ITicket = tickets[i];
      if (!ticket.quantity) continue;
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

    const detailsElms: Array<JSX.Element> = [];
    for (let i = 0; i < ticketDetails.length; ++i) {
      const currDetails = ticketDetails[i];
      const ticketType = tickets.find(t => currDetails.typeId === t.id);
      const description = ticketType?.description || "";

      const copyIndex = i;

      detailsElms.push(
        <TicketholderDetails index={i}
          name={currDetails.name}
          postcode={currDetails.postcode}
          phone={currDetails.phone}
          seatNum={currDetails.seatNum}
          description={description}
          showErrors={hasClickedPayment}
          onNameChange={s => { currDetails.name = s; }}
          onPostcodeChange={s => { currDetails.postcode = s; }}
          onPhoneChange={s => { currDetails.phone = s; }} />
      );
    }

    const isValidPurchaser = name.trim() && /^\S+@\S+$/.test(email) && phone.trim();
    const formsAreValid = isValidPurchaser && ticketDetails.every(a =>
      !!a.name.trim() && /^\d{4}$/.test(a.postcode)
    );

    return (
      <React.Fragment>
        <div style={{margin: "0 1em"}}>
          <Grid columns={2} stackable reversed="mobile">
            <Grid.Column>
              <Header as='h2'>Purchaser Details</Header>
              <Form>
                <Form.Field
                  control={Input}
                  label='Name'
                  name='name'
                  onChange={this.handleChange}
                  defaultValue={this.state.name}
                  error={hasClickedPayment && !name.trim()}
                  required
                />
                <Form.Field
                  control={Input}
                  label='Email'
                  name='email'
                  onChange={this.handleChange}
                  defaultValue={this.state.email}
                  error={hasClickedPayment && !/^\S+@\S+$/.test(email)}
                  required
                />
                <Form.Field
                  control={Input}
                  label='Phone'
                  name='phone'
                  onChange={this.handleChange}
                  defaultValue={this.state.phone}
                  error={hasClickedPayment && !phone.trim()}
                  required
                />
              </Form>

              {detailsElms}

              { hasClickedPayment && !formsAreValid ?
                <Message color='red'>Incomplete details, please fill all fields to continue.</Message>
              : undefined }
            </Grid.Column>

            <Grid.Column style={{fontVariantNumeric: "tabular-nums"}}>
              <Header as='h2'>Checkout</Header>
              <div className="tickets-list">
                {ticketElms}
              </div>
              <Divider style={{margin: '0em 1em'}}/>
              <div className="ticket-price">
                <List>
                <List.Item>
                  Subtotal: ${totalPrice.toFixed(2)}
                </List.Item>
                <List.Item>
                  <Popup
                    trigger={<Icon circular name='info' size='tiny' color='blue' inverted />}
                    content='This covers our ticket processing, technology and support costs. This fee is only once per transaction, no matter how many tickets are purchased.'
                    size='small'
                  /> Handling Fee: ${this.handlingFee(totalPrice).toFixed(2)}
                </List.Item>
                <List.Item>Total Cost: ${(totalPrice + this.handlingFee(totalPrice)).toFixed(2)}</List.Item>
                </List>
              </div>
              <Header as='h4'>Policies</Header>
              <p>By purchasing a ticket to UNSW Med Revue 2021, you agree to the following:</p>
              <ul>
              <li>Mask wearing within the theatre is currently compulsory at all times, except for momentary eating or drinking or if you have a relevant medical condition.</li>
              <li>Do <strong>not</strong> attend if you have symptoms of COVID-19, or you are required to self-isolate or quarantine.</li>
              <li>You will follow the <a href="https://hospitality.unsw.edu.au/storage/app/media/COVIDSafe/COVIDSafe%20Conditions%20of%20Entry.pdf" target="_blank">UNSW Hospitality conditions of entry</a> at all times.</li>
              <li>Arc tickets may require proof of Arc membership upon entry.</li>
              <li>Ticket exchanges may be available (subject to capacity). Please contact us ASAP if you need to reschedule.</li>
              <li>Tickets will be refunded in full (minus handling fees and surcharges) if the event is cancelled, or you are required to
              self-isolate due to COVID-19 regulations. Any other refunds will be at our sole discretion.
              (This does not affect your rights under Australian Consumer Law.)</li>
              </ul>
            </Grid.Column>
          </Grid>
        </div>
        <Container className="payment-btn-group">
          <Grid stackable columns={4} centered>
            <Grid.Column>
              <Grid columns={1}>
                <Grid.Column>
                  <SquareButton setupSquare={ async () => {
                    this.setState({hasClickedPayment: true});
                    if (!formsAreValid) return null;
                    return await this.setupSquare();
                  }} />
                </Grid.Column>
                <Grid.Column textAlign='center' style={{ paddingTop: "2px" }}>
                  <p>All major credit/debit cards accepted</p>
                </Grid.Column>
              </Grid>
            </Grid.Column>
            {/*
              For some reason the font size also affects the height.
              At smaller font sizes there is more 'mystery padding, but a
              large font size removes this immediately.
            */}
            {/*
            <Grid.Column>
              <Grid columns={1}>
                <Grid.Column>
                  <div style={{ height: "45px" }}>
                  <PayPalButton
                    createOrder={this.createOrder}
                    onApprove={ (data: any, actions: any) => this.onPaypalApprove(data, actions) }
                    fundingSource={ paypal.FUNDING.PAYPAL }
                    style={{ height: 45 }} />
                  </div>
                </Grid.Column>
                <Grid.Column textAlign='center' style={{ paddingTop: 0 }}>
                  <p>0.41% + $0.30 surcharge applies for PayPal</p>
                </Grid.Column>
              </Grid>
            </Grid.Column>
            */}
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
};
