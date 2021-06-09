import styled from 'styled-components';
import * as variables from 'src/shared/css.variables';
import Background from './Background.png';

export const Logo = styled.img`
  margin-bottom: 1rem;
  width: 152px;
`;

export const PageWrapper = styled.div`
  background: url(${Background});

  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
  width: 100vw;
`;

export const LandingPageWrapper = styled.div`
  box-sizing: border-box;
  display: flex;

  @media (max-width: ${variables.mediaSmall}) {
    flex-flow: column;
  }
`;

export const VideoColumn = styled.div`
  iframe {
    border-bottom-left-radius: 50px;
    overflow: hidden;

    @media (max-width: ${variables.mediaSmall}) {
      width: 356px;
    }
  }
`;

export const ProductionDescription = styled.div`
  color: ${variables.grey100};

  display: flex;
  flex-flow: column;
  justify-content: space-between;

  width: 512px;

  @media (max-width: ${variables.mediaSmall}) {
    width: 100%;
  }
`;

export const Description = styled.div`
  padding-bottom: 1rem;
`;

export const Gap = styled.div`
  padding: 1rem;
`;
