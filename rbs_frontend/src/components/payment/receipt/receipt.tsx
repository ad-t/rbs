import React from 'react';

import { ITicket } from '../../../types/tickets';

interface Props { tickets: Array<ITicket> };
interface State {};

export default class Receipt extends React.Component<Props, State> {
  render() {
    return (
      <div id='receipt-wrapper'>
        <div id='receipt-table'>
          <div id='receipt-title' className='receipt-row'>
            <span>QTY</span>
            <span>PRICE</span>
            <span>DESCRIPTION</span>
            <span>TOTAL</span>
          </div>
        </div>
      </div>
    );
  }
};
