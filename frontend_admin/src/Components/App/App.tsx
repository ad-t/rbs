import * as React from 'react';
import { AdminPage } from 'src/Components/AdminPage/AdminPage';
import Login from 'src/Pages/Login';
import Welcome from 'src/Pages/Welcome';
import Bookings from 'src/Pages/Bookings';
import FindBooking from 'src/Pages/FindBooking';
import ManualBooking from 'src/Pages/ManualBooking';
import OverridePayment from 'src/Pages/OverridePayment';
import { ReallocateSeat } from 'src/Pages/ReallocateSeat';
import { Route, Redirect, Switch } from 'react-router-dom';

export function App() {
  return (
    <AdminPage>
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
        <Route path="/override-payment/:orderId" component={OverridePayment} />
        <Route path="/reallocate-seat/:ticketId" component={ReallocateSeat} />
        <Route path="/" exact>
          <Redirect to="/welcome" />
        </Route>
        <Route>
          <p>404 Not Found</p>
        </Route>
      </Switch>
    </AdminPage>
  );
}
