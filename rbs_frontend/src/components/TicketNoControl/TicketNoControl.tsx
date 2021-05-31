/*
 * This file will handle the entire landing page.
 */
import React from 'react';
import { IoTicket } from 'react-icons/io5';
import { Button, Icon } from 'semantic-ui-react';
import {
  Logo,
  Controls,
  Description,
  TicketNumbers,
  Wrapper,
} from './TicketNoControl.styles';

interface Props {
  index: number;
  cost: number;
  description: string;
  quantity: number;
};

export default function Ticket({ cost, description, quantity }: Props) {
  return (
    <Wrapper>
      <Logo>
        <IoTicket />
      </Logo>
      <Description>
        ${cost} - {description}
      </Description>
      <Controls>
        <TicketNumbers>{quantity}</TicketNumbers>
      </Controls>
    </Wrapper>
  );
};
