import React from 'react'
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react'
import AdminNavbar from './Layouts/AdminNavbar'
import AdminFooter from './Layouts/AdminFooter'

class Overview extends React.Component {
  // TODO: use proper variable
  // TODO: handle timezones of client
  state = {
    shows: []
  }

  async componentDidMount() {
    // TODO: use proper ID
    const showRes = await fetch(`${process.env.REACT_APP_API_URL}/productions/1/shows`);

    if (showRes.status === 200) {
      const shows = await showRes.json();
      this.setState({shows});
    }
  }

  render() {
    const {shows} = this.state;
    return (
      <div>
        <AdminNavbar />

        <Container style={{ marginTop: '7em' }}>
          <Header as='h1'>Dashboard Overview</Header>
          <p>Check up on ticket sales here.</p>

          <Grid columns={4}>
            {shows.map((x, i) =>
              <Grid.Column>
                <Segment>
                  <p>Night {i+1}</p>
                  <strong>{new Date(x.time).toLocaleString()}</strong>
                  <p>{x.reservedSeats} tickets</p>
                </Segment>
              </Grid.Column>
            )}
          </Grid>
        </Container>

        <AdminFooter />
      </div>
    );
  }
}

export default Overview
