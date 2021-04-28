import styled from 'styled-components';

import * as variables from 'src/shared/css.variables';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;

  font-family: Karla, sans-serif;
  padding: 0.5rem;
`;

const Icon = styled.div`
  border-radius: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 32px;
  width: 32px;
`;

export const NotStartedIcon = styled(Icon)`
  background: ${variables.grey400};
  color: ${variables.grey100};
`;

export const InProgressIcon = styled(Icon)`
  background: ${variables.primary900};
  color: ${variables.primary100};
`;

export const CompletedIcon = styled(Icon)`
  background: ${variables.green500};
  color: ${variables.green50};
`;

export const ErroredIcon = styled(Icon)`
  background: ${variables.red500};
  color: ${variables.red50};
`;

export const InProgressName = styled.div`
  color: ${variables.grey900};
  margin-left: 0.5rem;
`;

export const Name = styled.div`
  color: ${variables.grey600};
  margin-left: 0.5rem;
`;
