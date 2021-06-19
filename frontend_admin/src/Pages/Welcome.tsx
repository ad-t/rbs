import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import {
  Container,
  Grid,
  Header,
  Loader,
  Segment,
  Statistic,
} from 'semantic-ui-react';
import { useAppSelector } from 'src/Store/hooks';

const LoaderWrapper = styled.div`
  padding: 1rem;
`;

const StatisticWrapper = styled.div`
  padding: 1rem;
  text-align: center;
`;

function Overview() {
  const shows = useAppSelector((state) => state.shows.shows);

  return (
    <Container style={{ marginTop: '7rem' }}>
      <Header as="h1">Dashboard Overview</Header>
      <p>Check up on ticket sales here.</p>

      {shows.length ? (
        <Grid columns={4} stackable>
          {shows.map((show, i) => (
            <Grid.Column>
              <Segment>
                <h4>
                  Night {i + 1} - {dayjs(show.time).format('DD/MM/YYYY')}
                </h4>
                <StatisticWrapper>
                  <Statistic label="Tickets" value={show.reservedSeats} />
                </StatisticWrapper>
              </Segment>
            </Grid.Column>
          ))}
        </Grid>
      ) : (
        <LoaderWrapper>
          <Loader active inline="centered" size="medium">
            Loading tickets
          </Loader>
        </LoaderWrapper>
      )}
    </Container>
  );
}

export default Overview;
