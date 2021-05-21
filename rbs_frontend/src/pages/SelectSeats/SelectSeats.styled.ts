import styled from 'styled-components';
import * as variables from 'src/shared/css.variables';

export const MainWrapper = styled.div`
  padding: 1rem;
`;

export const SeatingWrapper = styled.div`
  margin: 1rem 0;
  overflow-x: auto;
  width: 100%;
`;

export const LegendWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;

  @media (min-width: ${variables.mediaSmall}) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
`;

export const Legend = styled.div`
  background: ${variables.grey100};
  display: flex;
  align-items: center;
  padding: 0.75rem;

  button {
    margin-right: 0.5rem;
  }
`;
