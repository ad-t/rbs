import styled from 'styled-components';
import * as variables from 'src/shared/css.variables';

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
  padding: 0 25px;
  
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  vertical-align: middle;
  /*padding: 0 12px 2px 12px;*/

  &:disabled {
    box-shadow: none;
    cursor: default;
  }
  &:focus {
    outline: none;
  }
  
  img {
    height: 30px;
    margin-left: 10px;
    padding-bottom: 2px;
  }
`;
