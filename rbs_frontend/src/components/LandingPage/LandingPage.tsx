/*
 * This file will handle the entire landing page.
 */
import React from 'react';
import { Button } from 'semantic-ui-react'

interface Props {};
interface State {};

export default class LandingPage extends React.Component<Props, State> {
  render() {
    return (
      <div className="landing-page" style={{flexGrow: 1}}>
        <div className="button-group">
          <Button primary>Buy Tickets</Button>
          <Button secondary>About The Show</Button>
          <Button secondary>Watch Trailer</Button>
        </div>
      </div>
    );
  }
};
