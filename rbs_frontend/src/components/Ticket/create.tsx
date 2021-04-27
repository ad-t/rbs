import React from 'react';
import * as mobxReact from 'mobx-react-lite';
import Ticket, { TicketProps } from './Ticket';
import TicketState from './Ticket.state';
import TicketController from './Ticket.controller';

export interface TicketConfig
  extends Omit<TicketProps, 'updateTickets' | 'ticketAmount'> {
  initialAmount: number;
}

export function createTicket(props: TicketConfig) {
  const state = new TicketState(props.initialAmount);
  const controller = new TicketController();

  function updateTickets(amount: number) {
    controller.incrementTickets(state, amount);
  }

  return {
    ticketState: state,
    Ticket: mobxReact.observer(() => (
      <Ticket
        {...props}
        ticketAmount={state.value}
        updateTickets={updateTickets}
      />
    )),
  };
}
