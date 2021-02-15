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
  nights = [123, 456, 135, 246];

  render() {
    return (
      <div>
        <AdminNavbar />

        <Container style={{ marginTop: '7em' }}>
          <Header as='h1'>Dashboard Overview</Header>
          <p>Check up on ticket sales here.</p>

          <Grid columns={4}>
            {this.nights.map((x, i) =>
              <Grid.Column>
                <Segment>
                  Night {i+1}: {x} tickets
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
