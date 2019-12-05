/*
 * This component will return an invoice that shows what tickets were purchased from the user.
 */
import React from 'react';

export default class Ticket extends React.Component<{}, {}> {
  render() {
    return (
      <div className="rbs-flex-grow-1 flex flex-column pv2 ph3">
        <div className="flex items-center mv3">
          <span className="rbs-circled-number mr2">2</span>
          <span className="b f3 lh-title">INVOICE</span>
        </div>
        <div className="rbs-flex-grow-1 flex flex-column justify-between">
          <div>
          </div>
          <div>
            <button className="rbs-btn b bn mb2 pa2 w-100">PAY WITH PAYPAL</button>
            <button className="rbs-btn b bn mb2 pa2 w-100">PAY WITH STRIPE</button>
          </div>
        </div>
      </div>
    );
  }
};
