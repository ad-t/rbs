import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  padding: 0.35rem 0;
`;

const LeftColumn = styled.div`
  display: flex;
  transform: rotate(10deg);
  transform-origin: center right;
  justify-self: end;
`;

const CenterColumn = styled.div`
  display: flex;
  justify-self: center;
`;

const RightColumn = styled.div`
  display: flex;
  transform: rotate(-10deg);
  transform-origin: center left;
  justify-self: start;
`;

export interface RowProps {
  column1: number;
  column2: number;
  column3: number;
  seats: JSX.Element[];
}

export default function Row({ column1, column2, column3, seats }: RowProps) {
  if (column1 + column2 + column3 < seats.length) {
    throw new Error('The amount of seats specified will not will this row.');
  }

  const column1Elements = seats.slice(0, column1);
  const column2Elements = seats.slice(column1, column1 + column2);
  const column3Elements = seats.slice(
    column1 + column2,
    column1 + column2 + column3
  );

  return (
    <Wrapper>
      <LeftColumn>{column1Elements}</LeftColumn>
      <CenterColumn>{column2Elements}</CenterColumn>
      <RightColumn>{column3Elements}</RightColumn>
    </Wrapper>
  );
}
