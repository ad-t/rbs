import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

interface AppProps {
  LandingPageElement: React.ReactNode;
  TicketingSystemElement: React.ReactNode;
}

export function App({ LandingPageElement, TicketingSystemElement }: AppProps) {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/tickets">{TicketingSystemElement}</Route>
          <Route path="/">{LandingPageElement}</Route>
        </Switch>
      </Router>
      <ToastContainer />
    </>
  );
}
