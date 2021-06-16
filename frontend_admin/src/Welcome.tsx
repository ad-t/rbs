import React from 'react';
import { Container, Grid, Header, Segment } from 'semantic-ui-react';
import { installShows } from 'src/Api/installShows';
import { Show } from 'src/shared/types';
import AdminNavbar from './Layouts/AdminNavbar';
import AdminFooter from './Layouts/AdminFooter';

interface State {
  shows: Show[];
}

class Overview extends React.Component<{}, State> {
  state = {
    shows: [] as Show[],
  };

  async componentDidMount() {
    const shows = await installShows();
    this.setState({ shows });
  }

  render() {
    const { shows } = this.state;
    return (
      <div>
        <AdminNavbar />

        <Container style={{ marginTop: '7em' }}>
          <Header as="h1">Dashboard Overview</Header>
          <p>Check up on ticket sales here.</p>

          <Grid columns={4}>
            {shows &&
              shows.map((show, i) => (
                <Grid.Column>
                  <Segment>
                    <p>Night {i + 1}</p>
                    <strong>{new Date(show.time).toLocaleString()}</strong>
                    <p>{show.reservedSeats} tickets</p>
                  </Segment>
                </Grid.Column>
              ))}
          </Grid>
        </Container>

        <AdminFooter />
      </div>
    );
  }
}

export default Overview;
