import React, { Component } from 'react';
import Login from './Login';
import Welcome from './Welcome';
import Bookings from './Bookings';
import FindBooking from './FindBooking';
import ManualBooking from './ManualBooking';
import { Route, Redirect, Switch } from "react-router-dom";
import { AdminRoute } from './AdminRoute';


class App extends Component {
  render() {
    let { match } = this.props;

    return (
      <div>
        <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/welcome">
          <Welcome />
        </Route>
        <Route path="/bookings">
          <Bookings />
        </Route>
        <Route path="/find-booking">
          <FindBooking />
        </Route>
        <Route path="/manual-booking">
          <ManualBooking />
        </Route>
        <Route path="/" exact>
          <Redirect to="/welcome" />
        </Route>
        <Route>
          <p>404 Not Found</p>
        </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
