import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useAppDispatch } from 'src/Store/hooks';
import { installShows } from 'src/Api/installShows';
import { setShows } from 'src/Store/slices/showSlice';
import { AdminPage } from 'src/Components/AdminPage/AdminPage';
import { createAllBookings } from 'src/Components/AllBookings/create';
import Login from 'src/Pages/Login';
import Welcome from 'src/Pages/Welcome';
import FindBooking from 'src/Pages/FindBooking';
import ManualBooking from 'src/Pages/ManualBooking';
import OverridePayment from 'src/Pages/OverridePayment';
import { SeatingPage } from 'src/Pages/Seatings';
import { ReallocateSeat } from 'src/Pages/ReallocateSeat';

const { AllBookingElement } = createAllBookings();

export function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    installShows().then((shows) => {
      dispatch(setShows(shows));
    });
    /* eslint-disable-next-line */
  }, []);

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
          <AllBookingElement />
        </Route>
        <Route path="/find-booking">
          <FindBooking />
        </Route>
        <Route path="/manual-booking">
          <ManualBooking />
        </Route>
        <Route path="/seating">
          <SeatingPage />
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
