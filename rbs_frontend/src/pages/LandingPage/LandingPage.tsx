/*
 * This file will handle the entire landing page.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Image } from 'semantic-ui-react';

export default class LandingPage extends React.Component {
  render() {
    return (
      <div className="landing-page" style={{ flexGrow: 1 }}>
        <Image
          src="/logo.png"
          size="medium"
          centered
          style={{ paddingTop: '4em' }}
        ></Image>
        <Image
          src="/breaking-bones.png"
          centered
          style={{ paddingTop: '4em' }}
        ></Image>

        <div className="button-group">
          {/*
        <Container text align='center' style={{color:'white', margin: '1em', fontSize: '20px', fontWeight: 'bold'}}>
          <p>Breaking Bones:</p>
          <p>The comedy sketch spectacular returning to UNSW!</p>
          <p>13-16 April 2021</p>
        </Container>
        */}
          <Link to="/tickets">
            <Button primary>Buy Tickets</Button>
          </Link>
          {/*
          <Button secondary>About The Show</Button>
          <Button secondary>Watch Trailer</Button>
        */}
        </div>
      </div>
    );
  }
}
