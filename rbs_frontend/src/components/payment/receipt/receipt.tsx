import React from 'react';

import { ITicket } from '../../../types/tickets';

interface Props { tickets: Array<ITicket> };
interface State {};

export default class Receipt extends React.Component<Props, State> {
  render() {
    const { tickets } = this.props;
    const receiptElm = [];
    let totalPreMerchant = 0.0;

    for (let ticket of tickets) {
      totalPreMerchant += (ticket.quantity * ticket.cost);
      receiptElm.push(
        <div className='receipt-row'>
          <span>{ticket.quantity}</span>
          <span>${ticket.cost}</span>
          <span>{ticket.description}</span>
          <span>${ticket.quantity * ticket.cost}</span>
        </div>
      );
    }

    return (
      <div id='receipt-wrapper'>
        <div id='receipt-table'>
          <div id='receipt-title' className='receipt-row'>
            <span>QTY</span>
            <span>PRICE</span>
            <span>DESCRIPTION</span>
            <span>TOTAL</span>
          </div>
          {receiptElm}
        </div>
        <div id='receipt-total'>TOTAL*: ${totalPreMerchant}</div>
      </div>
    );
  }
};
