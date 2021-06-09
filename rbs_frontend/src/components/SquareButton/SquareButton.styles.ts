import styled from 'styled-components';

export const PaymentButton = styled.button`
  border: none;
  border-radius: 5px;

  cursor: pointer;
  background: #2185d0;
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 45px;
  padding: 0 0.5rem 0 1rem;
  margin: auto;

  font-family: Rubik, Helvetica, Arial, sans-serif;
  font-size: 16px;

  &:disabled {
    box-shadow: none;
    cursor: default;
  }

  &:focus {
    outline: none;
  }

  svg {
    font-size: 3rem;
  }
`;
