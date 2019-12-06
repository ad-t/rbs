/*
 * This component will return an invoice that shows what tickets were purchased from the user.
 */
import React from 'react';
import { Accordion, Button, Divider, Form, Icon, Input } from 'semantic-ui-react';
import { ITicket } from '../../../types/tickets';

import TicketNoControl from '../TicketNoControl';

interface Props {
  tickets: Array<ITicket>;
};

interface State {
  name: string;
  email: string;
  phone: string;
  showTickets: boolean;
};

export default class Ticket extends React.Component<Props, State> {
  state = {
    name: '',
    email: '',
    phone: '',
    showTickets: false
  };

  handleChange = (e: any, { name, value } : any) => {
    this.setState({[name]: value} as Pick<State, keyof State>);
  }

  handleSubmit = () => {
    const { name, email, phone } = this.state;
    console.log(`${name} ${email} ${phone}`);
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
      <Form onSubmit={this.handleSubmit} style={{padding: '0 1em'}}>
        <Form.Input
          label='Name'
          placeholder='Your name'
          name="name"
          value={name}
          onChange={this.handleChange}
        />
        <Form.Input
          label='Email'
          placeholder='Your email'
          name="email"
          value={email}
          onChange={this.handleChange}
        />
        <Form.Field>
          <label>Phone Number</label>
          <Input
            label='+61'
            placeholder='4xx xxx xxx'
            name="phone"
            value={phone}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Accordion styled style={{margin: '1.5em 0'}}>
          <Accordion.Title
            active={showTickets}
            index={0}
            onClick={() => this.setState({showTickets: !showTickets})}
          >
            <Icon name='dropdown' />
            View Your Tickets
          </Accordion.Title>
          <Accordion.Content active={showTickets}>
            <div className="tickets-list">
              {ticketElms}
            </div>
            <Divider style={{margin: '0em 1em'}}/>
            <div className="ticket-price-summary">Total Cost: ${totalPrice}</div>
          </Accordion.Content>
        </Accordion>
        <Button type='submit' fluid primary>PURCHASE TICKETS</Button>
      </Form>
    );
  }
};
