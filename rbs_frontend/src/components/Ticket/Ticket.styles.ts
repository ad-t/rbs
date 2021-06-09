import styled from 'styled-components';
import * as variables from 'src/shared/css.variables';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;

  box-shadow: ${variables.boxShadowMd};
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

const ModifyButton = styled.button`
  border: none;
  border-radius: 50%;
  box-shadow: ${variables.boxShadow};

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 32px;
  width: 32px;

  &:disabled {
    box-shadow: none;
    cursor: default;
  }
  &:focus {
    outline: none;
  }
`;

export const DecrementButton = styled(ModifyButton)`
  color: ${variables.red50};
  background: ${variables.red500};
  &:hover {
    background: ${variables.red700};
  }
  &:disabled {
    background: ${variables.red300};
  }
`;

export const IncrementButton = styled(ModifyButton)`
  color: ${variables.green50};
  background: ${variables.green500};
  &:hover {
    background: ${variables.green700};
  }
  &:disabled {
    background: ${variables.green300};
  }
`;
