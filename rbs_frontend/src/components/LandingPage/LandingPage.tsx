/*
 * This file will handle the entire landing page.
 */
import React from 'react';

interface Props {};
interface State {};

export default class LandingPage extends React.Component<Props, State> {
  render() {
    return (
      <div className="landing-page cover h-100" style={{flexGrow: 1}}>
        <div className="button-group flex flex-column items-center absolute bottom-0 w-100">
          <button className="btn-landing">Buy Tickets</button>
          <button className="btn-landing secondary">About The Show</button>
          <button className="btn-landing secondary">Watch Trailer</button>
        </div>
      </div>
    );
  }
};
