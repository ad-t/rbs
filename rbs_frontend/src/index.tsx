/*
 * This is where the magic happens.
 * The index file connects all of the pages together and holds the memory for the ticketing
 * information.
 */
import React from 'react';
import ReactDOM from 'react-dom';

// Import interfaces
import { ITicket } from './types/tickets';

// Import subcomponents
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import BookTickets from './components/TicketingSystem/BookTickets';
import Invoice from './components/TicketingSystem/Invoice';

// Import assets (e.g. scss)
import './assets/scss/main.scss';
import * as serviceWorker from './serviceWorker';

interface State {
  tickets: Array<ITicket>;
};

class Index extends React.Component<{}, State> {
  state: State = {
    tickets: [],
  }

  render() {
    return (
      <div className="flex vh-100">
        <LandingPage />
      </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
