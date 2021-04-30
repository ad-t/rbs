import React from 'react';
import styled from 'styled-components';
import * as variables from 'src/shared/css.variables';

import { MdEventSeat } from 'react-icons/md';

const Wrapper = styled.button`
  background: white;
  border: 0.125rem solid ${variables.grey500};
  border-radius: 100%;
  color: ${variables.grey500};
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0.1rem;
  height: 32px;
  width: 32px;

  &:hover {
    border: 0.125rem solid ${variables.grey900};
    color: ${variables.grey900};
  }
`;

export default function Seat() {
  return (
    <Wrapper>
      <MdEventSeat />
    </Wrapper>
  );
}
