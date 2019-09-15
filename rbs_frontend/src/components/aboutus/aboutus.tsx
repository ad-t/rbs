import React from 'react';

interface Props {};

const AboutUs: React.SFC<Props> = () => {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">About Us</h1>
        <h2 className="subtitle">
          RBS or Revue Booking System is a student lead project that intends to create a
          booking platform that minimises cost for UNSW Revues. The Revue Booking System
          allows customers to choose a date to view the show and buy a certain number
          of tickets.
        </h2>
        <h2 className="subtitle">
          For the revues, they will be able to view the number of tickets purchased and
          set up the system with just a click of a button.
        </h2>
      </div>
    </section>
  );
};

export default AboutUs;