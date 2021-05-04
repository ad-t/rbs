import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column;
  padding-top: 4rem;
`;

interface SeatingProps {
  rows: JSX.Element[] | JSX.Element;
}

export default function Seating({ rows }: SeatingProps) {
  return <Wrapper>{rows}</Wrapper>;
}
