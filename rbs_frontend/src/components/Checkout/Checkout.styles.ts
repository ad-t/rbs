import styled from 'styled-components';

export const TicketsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 1fr);
  padding: 1rem 0;
  row-gap: 1rem;
`;

export const TicketPrice = styled.div`
  font-family: Rubik, sans-serif;
  font-size: 16px;
  text-align: right;
  padding: 1rem;
`;
