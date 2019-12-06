/*
 * This component will return an invoice that shows what tickets were purchased from the user.
 */
import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

export default class Ticket extends React.Component<{}, {}> {
  render() {
    return (
      <div className="btn-show-nights">
        <Button size='large' fluid primary><Icon name="paypal"/> PAY WITH PAYPAL</Button>
      </div>
    );
  }
};
