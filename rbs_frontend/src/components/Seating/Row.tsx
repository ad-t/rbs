import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  padding: 0.25rem 0;
`;

const LeftColumn = styled.div`
  display: flex;
  transform: rotate(10deg);
  transform-origin: center right;
`;

const CenterColumn = styled.div`
  display: flex;
  padding: 0 1rem;
`;

const RightColumn = styled.div`
  display: flex;
  transform: rotate(-10deg);
  transform-origin: center left;
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
