import styled from 'styled-components';
import { Container } from 'semantic-ui-react';
import * as variables from 'src/shared/css.variables';

export const PaymentBtnGroup = styled(Container)`
  margin-top: 1em;
`;

export const TicketsList = styled.div`
  font-variant-numeric: tabular-nums;
  padding: 0 1em;
`;

export const TicketPrice = styled.div`
  font-size: 17px;
  text-align: right;
  padding: 1em;
`;
