import * as mobxReact from 'mobx-react-lite';
import * as React from 'react';
import { useAppSelector } from 'src/Store/hooks';
import { AllBookings } from './AllBookings';
import { AllBookingsState } from './AllBookings.state';

export function createAllBookings() {
  const allBookingsState = new AllBookingsState();

  return {
    AllBookingElement: mobxReact.observer(() => {
      const shows = useAppSelector((state) => state.shows.shows);

      return (
        <AllBookings
          tickets={allBookingsState.tickets}
          shows={shows}
          loadingState={allBookingsState.loadingState}
        />
      );
    }),
  };
}
