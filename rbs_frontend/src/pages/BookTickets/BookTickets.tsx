/*
 * This file will handle the entire landing page.
 */
import * as React from 'react';
import { Button, Loader, Icon } from 'semantic-ui-react';
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
  preventProceed: boolean;
  retract: () => void;
}

export default function BookTickets({
  tickets,
  totalPrice,
  preventProceed = false,
  retract,
}: Props) {
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
      <TicketsWrapper>
        {tickets.length ? (
          tickets
        ) : (
          <Loader active content="Loading Tickets" inline="centered" />
        )}
      </TicketsWrapper>
      <Subtotal>
        <strong>Subtotal:</strong> {totalPrice.toFixed(2)}
      </Subtotal>
      <div>
        <Button icon labelPosition="left" onClick={retract}>
          <Icon name="arrow left" />
          Select show
        </Button>
        <Button primary icon labelPosition="right" disabled={preventProceed}>
          Reserve tickets
          <Icon name="arrow right" />
        </Button>
      </div>
    </>
  );
}
