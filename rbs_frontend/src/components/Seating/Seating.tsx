import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column;

  padding: 4rem 1rem;
  position: relative;
`;

const FrontOfStage = styled.div`
  font-family: Karla, sans-serif;
  font-weight: bold;

  position: absolute;
  top: 2rem;
  left: 50%;
  transform: translate(-50%, -50%);
`;

interface SeatingProps {
  rows: JSX.Element[] | JSX.Element;
}

export default function Seating({ rows }: SeatingProps) {
  return (
    <Wrapper>
      <FrontOfStage>Front Of Stage</FrontOfStage>
      {rows}
    </Wrapper>
  );
}
