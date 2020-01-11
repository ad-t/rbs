/*
 * This component will return an invoice that shows what tickets were purchased from the user.
 */
import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

// Import our interface
import { ITicket } from '../../../types/tickets';

interface Prop {
  details: any;
}

export default class ConfirmOrder extends React.Component<Prop, {}> {
  render() {
    return (
      <div>
        Payment Complete!!!!!!!
      </div>
    );
  }
};
