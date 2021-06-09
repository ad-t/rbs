import styled from 'styled-components';
import * as variables from 'src/shared/css.variables';

export const ButtonGroup = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;

  @media (min-width: ${variables.mediaSmall}) {
    flex-flow: row;
  }
`;

export const Gap = styled.div`
  padding: 0.5rem;
`;

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
