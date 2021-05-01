import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;

interface SeatingProps {
  rows: JSX.Element[] | JSX.Element;
}

export default function Seating({ rows }: SeatingProps) {
  return <Wrapper>{rows}</Wrapper>;
}
