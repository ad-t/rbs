import React from 'react';
import { LoremIpsum } from 'lorem-ipsum';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import {
  Description,
  Gap,
  LandingPageWrapper,
  Logo,
  PageWrapper,
  ProductionDescription,
  VideoColumn,
} from './LandingPage.styled';
import { Button } from 'semantic-ui-react';
import LogoSrc from './logo.png';

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
