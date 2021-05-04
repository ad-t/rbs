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
  column1: React.ReactNode;
  column2: React.ReactNode;
  column3: React.ReactNode;
}

export default function Row({ column1, column2, column3 }: RowProps) {
  return (
    <Wrapper>
      <LeftColumn>{column1}</LeftColumn>
      <CenterColumn>{column2}</CenterColumn>
      <RightColumn>{column3}</RightColumn>
    </Wrapper>
  );
}
