import React from 'react';

import Receipt from './receipt';

import TicketContext from '../../context/tickets';

interface Props {};
interface State {};

export default class Payment extends React.Component<Props, State> {
  render() {
    return (
      <section className='hero is-fullheight-with-navbar rbs-app-bg'>
        <div className='hero-body'>
          <div className='container'>
              <div id='payment-box'>
                <div id='confirm-order'>Confirm Order</div>
                <div id='information-box'>
                  <div className='info-column'>
                    <TicketContext.Consumer>{(tixManager) => (
                      <Receipt tickets={tixManager !== null ? tixManager.getTickets() : []} />
                    )}</TicketContext.Consumer>
                  </div>
                  <div id='border'></div>
                  <div className='info-column'>d</div>
                </div>
                <div id='info-merchant'>*NOTE: This total does not include the Merchant’s fee. The full total with the merchant’s fee will displayed on the payment button.</div>
              </div>
          </div>
        </div>
      </section>
    );
  }
};