import React from 'react';
import styled from 'styled-components';
import { IoTicket } from 'react-icons/io5';
import { FaCreditCard, FaFileInvoice } from 'react-icons/fa';

import Item from './StepItem';

const Wrapper = styled.div`
  display: flex;
`;

export default function Steps() {
  return (
    <Wrapper>
      <Item icon={<IoTicket />} name="Purchase Ticket" />
      <Item icon={<FaCreditCard />} name="Payment" />
      <Item icon={<FaFileInvoice />} name="Invoice" />
    </Wrapper>
  );
}
