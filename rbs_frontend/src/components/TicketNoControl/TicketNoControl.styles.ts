import styled from 'styled-components';
import * as variables from 'src/shared/css.variables';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;

  box-shadow: ${variables.boxShadowLg};
  font-family: Rubik, sans-serif;
  padding: 0.75rem;
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
`;

export const Logo = styled.div`
  color: ${variables.primary700};
  display: flex;
  align-items: center;
`;

export const Description = styled.div`
  color: ${variables.grey700};
  margin: 0 0.5rem;
`;

export const TicketNumbers = styled.div`
  margin: 0 0.5rem;
  text-align: center;
  width: 16px;
`;
