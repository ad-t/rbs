import React from 'react';

interface Props {};
interface State {};

export default class AboutUs extends React.Component<Props, State> {
  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">About Us</h1>
          <h2 className="subtitle">
            The Revue Booking System or RBS, is a free alternative to other booking systems such
            as QPAY. As such, you will only need to pay a small fee of 1.5% + $0.60 per transaction
            instead of 12%.
          </h2>
        </div>
      </section>
    );
  }
};
