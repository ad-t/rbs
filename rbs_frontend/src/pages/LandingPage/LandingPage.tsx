import React from 'react';
import { LoremIpsum } from 'lorem-ipsum';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';
import * as variables from 'src/shared/css.variables';
import Background from './Background.png';
import LogoSrc from './logo.png';

const Logo = styled.img`
  margin-bottom: 1rem;
  width: 152px;
`;

const PageWrapper = styled.div`
  background: url(${Background});

  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
  width: 100vw;
`;

const LandingPageWrapper = styled.div`
  box-sizing: border-box;
  display: flex;

  @media (max-width: ${variables.mediaSmall}) {
    flex-flow: column;
  }
`;

const VideoColumn = styled.div`
  iframe {
    border-bottom-left-radius: 50px;
    overflow: hidden;

    @media (max-width: ${variables.mediaSmall}) {
      width: 356px;
    }
  }
`;

const ProductionDescription = styled.div`
  color: ${variables.grey100};

  display: flex;
  flex-flow: column;
  justify-content: space-between;

  width: 512px;

  @media (max-width: ${variables.mediaSmall}) {
    width: 100%;
  }
`;

const Description = styled.div`
  padding-bottom: 1rem;
`;

const Gap = styled.div`
  padding: 1rem;
`;

export default function LandingPage() {
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4,
    },
    wordsPerSentence: {
      max: 8,
      min: 2,
    },
  });
  return (
    <PageWrapper>
      <LandingPageWrapper>
        <ProductionDescription>
          <Description>
            <div style={{ textAlign: 'center' }}>
              <Logo src={LogoSrc} alt="CSE Revue" />
            </div>
            <p>{lorem.generateParagraphs(1)}</p>
            <p>{lorem.generateParagraphs(1)}</p>
          </Description>
          <Link to="/tickets">
            <Button fluid primary>
              Buy Tickets
            </Button>
          </Link>
        </ProductionDescription>
        <Gap />
        <VideoColumn>
          <YouTube videoId="dQw4w9WgXcQ" />
        </VideoColumn>
      </LandingPageWrapper>
    </PageWrapper>
  );
}
