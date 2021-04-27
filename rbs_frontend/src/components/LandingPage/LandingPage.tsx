/*
 * This file will handle the entire landing page.
 */
import React from 'react';
import { Button, Image, Container } from 'semantic-ui-react'

interface Props {
  toggleTickets: () => void
};
interface State {};

export default class LandingPage extends React.Component<Props, State> {
  render() {
    return (
      <div className="landing-page" style={{flexGrow: 1}}>
        <Image src="/logo.png" size="medium" centered style={{paddingTop:'4em'}}></Image>
        <Image src="/breaking-bones.png" centered style={{paddingTop:'4em'}}></Image>

        <div className="button-group">
        {/*
        <Container text align='center' style={{color:'white', margin: '1em', fontSize: '20px', fontWeight: 'bold'}}>
          <p>Breaking Bones:</p>
          <p>The comedy sketch spectacular returning to UNSW!</p>
          <p>13-16 April 2021</p>
        </Container>
        */}
          <Button primary onClick={this.props.toggleTickets}>Buy Tickets</Button>
        {/*
          <Button secondary>About The Show</Button>
          <Button secondary>Watch Trailer</Button>
        */}
        </div>
      </div>
    );
  }
};
