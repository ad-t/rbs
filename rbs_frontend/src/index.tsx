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
import LandingPage from './components/LandingPage';
import TicketingSystem from './components/TicketingSystem';

// Import assets (e.g. scss)
import * as serviceWorker from './serviceWorker';

interface State {
  tickets: Array<ITicket>;
  buyingTicket: Boolean;
}

class Index extends React.Component<{}, State> {
  state: State = {
    tickets: [],
    buyingTicket: false,
  };

  toggleTickets = () =>
    this.setState({ buyingTicket: !this.state.buyingTicket });

  render() {
    const { buyingTicket } = this.state;

    return (
      <React.Fragment>
        {buyingTicket ? (
          <TicketingSystem />
        ) : (
          <LandingPage toggleTickets={this.toggleTickets} />
        )}
      </React.Fragment>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
