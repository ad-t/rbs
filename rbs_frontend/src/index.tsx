/*
 * This is where the magic happens.
 * The index file connects all of the pages together and holds the memory for the ticketing
 * information.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Import subcomponents
import TicketingSystem from './components/TicketingSystem';

// Import assets (e.g. scss)
import './assets/scss/main.scss';
import * as serviceWorker from './serviceWorker';

interface State {
};

class Index extends React.Component<{}, State> {

  constructor() {
    super({});
  }

  render() {
    return (
      <div>
        <TicketingSystem />
      </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
