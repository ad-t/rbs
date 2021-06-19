import React from 'react';
import { Container, Header } from 'semantic-ui-react';

const ManualBooking = () => (
  <Container text style={{ marginTop: '7em' }}>
    <Header as="h1">Manual Booking</Header>
    <p>
      Process the booking through the main site, then when you reach the payment
      page, attempt to pay and then quit out of the Square payment window.
    </p>
    <p>
      Once this is done, you should see the order as unpaid on the bookings
      page.
    </p>
    <p>
      You should now be able to manually override the booking as paid in special
      circumstances.
    </p>
    <p>Only use this if it is necessary.</p>
  </Container>
);

export default ManualBooking;
