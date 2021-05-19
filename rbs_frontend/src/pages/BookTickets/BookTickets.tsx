/*
 * This file will handle the entire landing page.
 */
import * as React from 'react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

const Subtotal = styled.div`
  font-family: Rubik, sans-serif;
  font-size: 1.5rem;
  margin: 1.5rem 0;
  text-align: right;
`;

const TextWrapper = styled.div`
  margin: 1rem 0;
`;

const TicketsWrapper = styled.div`
  margin: 1rem 0;
`;

interface Props {
  tickets: JSX.Element[];
  totalPrice: number;
}

export default function BookTickets({ tickets, totalPrice }: Props) {
  return (
    <>
      <TextWrapper>
        <p>
          <strong>Note:</strong> A Handling Fee of $2.19 per transaction
          applies.
        </p>
        <p>
          Maximum 10 tickets per transaction. For groups &gt;10, please split
          bookings into two 🙂
        </p>
        <p>
          Book <strong>four or more tickets</strong> (Arc or General) in one
          transaction and save!
        </p>
      </TextWrapper>
      <TicketsWrapper>{tickets}</TicketsWrapper>
      <Subtotal>
        <strong>Subtotal:</strong> {totalPrice.toFixed(2)}
      </Subtotal>
      <div>
        <Button primary fluid>
          RESERVE TICKETS
        </Button>
      </div>
    </>
  );
}
