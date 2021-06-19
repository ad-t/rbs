import React from 'react';
import styled from 'styled-components';
import { Container, Grid, Header, Loader, Segment } from 'semantic-ui-react';
import { installShows } from 'src/Api/installShows';
import { Show } from 'src/shared/types';

const LoaderWrapper = styled.div`
  padding: 1rem;
`;

function Overview() {
  const [shows, setShows] = React.useState<Show[]>([]);

  React.useEffect(() => {
    async function loadShows() {
      const shows = await installShows();
      setShows(shows);
    }
    loadShows();
  }, []);

  return (
    <Container style={{ marginTop: '7em' }}>
      <Header as="h1">Dashboard Overview</Header>
      <p>Check up on ticket sales here.</p>

      {shows.length ? (
        <Grid columns={4} stackable>
          {shows.map((show, i) => (
            <Grid.Column>
              <Segment>
                <p>Night {i + 1}</p>
                <strong>{new Date(show.time).toLocaleString()}</strong>
                <p>{show.reservedSeats} tickets</p>
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
