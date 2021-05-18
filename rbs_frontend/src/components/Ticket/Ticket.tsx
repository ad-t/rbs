/*
 * This file will handle the entire landing page.
 */
import React from 'react';
import { IoTicket } from 'react-icons/io5';
import { HiMinusSm, HiOutlinePlusSm } from 'react-icons/hi';
import {
  Logo,
  Controls,
  Description,
  DecrementButton,
  IncrementButton,
  TicketNumbers,
  Wrapper,
} from './Ticket.styles';

export interface TicketProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  cost: number;
  minPurchase: number;
  ticketAmount: number;
  updateTickets(amount: number): void;
}

export default function Ticket({
  name,
  cost,
  minPurchase,
  ticketAmount,
  updateTickets,
  ...divProps
}: TicketProps) {
  function modifyTicket(value: number) {
    // Modify the ticket sales by a value
    let newTicketNumber = ticketAmount + value;
    if (newTicketNumber < minPurchase) {
      if (value > 0) newTicketNumber = minPurchase;
      else newTicketNumber = 0;
    }

    updateTickets(newTicketNumber);
  }

  return (
    <Wrapper {...divProps}>
      <Logo>
        <IoTicket />
      </Logo>
      <Description>
        ${cost} - {name}
      </Description>
      <Controls>
        <DecrementButton
          disabled={ticketAmount <= 0}
          onClick={() => modifyTicket(-1)}
        >
          <HiMinusSm />
        </DecrementButton>
        <TicketNumbers>{ticketAmount}</TicketNumbers>
        <IncrementButton onClick={() => modifyTicket(1)}>
          <HiOutlinePlusSm />
        </IncrementButton>
      </Controls>
    </Wrapper>
  );
}
