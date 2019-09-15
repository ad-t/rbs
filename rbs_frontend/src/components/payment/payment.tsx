import React from 'react';

import Receipt from './receipt';

import TicketContext from '../../context/tickets';

import TicketIcon from '../../assets/img/tickets-custom.png';

interface Props {};
interface State {};

const NeedToOrderTickets: React.SFC<{}> = () => {
  return (
    <div id='need-to-order-tickets'>
      <img src={TicketIcon} alt='Ticket Icon' />
      <div id="text">Please order tickets first!</div>
    </div>
  )
}

const InformationBox: React.SFC<{}> = () => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default class Payment extends React.Component<Props, State> {
  render() {
    return (
      <section className='hero is-fullheight-with-navbar rbs-app-bg'>
        <div className='hero-body'>
          <div className='container'>
              <div id='payment-box'>
                <div id='confirm-order'>Confirm Order</div>
                <TicketContext.Consumer>{(tixManager) => (
                  (tixManager !== null && tixManager.getTickets().length !== 0 ?
                    <InformationBox /> : <NeedToOrderTickets />
                  )
                )}</TicketContext.Consumer>
              </div>
          </div>
        </div>
      </section>
    );
  }
};