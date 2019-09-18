import React from 'react';

import { ITicket } from '../../../types/tickets';
import TicketContext from '../../../context/tickets';

enum Merchant {
  PAYPAL,
  STRIPE
}

interface BtnProps {
  tickets: Array<ITicket>;
  paymentPlatform: string,
  paymentIcon: string,
  takePercentage: number,
  takeBase: number,
  onClick(merchant: Merchant): void
};

/*
 * This component is here to help render out the payment buttons.
 * The final cost will be determined by finalCost + (finalCost * takePercentage) + takeBase
 * 
 * @param {tickets} Array<ITickets>, The array of tickets purchased
 * @param {paymentPlatform} string, The name of the payment platform you are using
 * @param {paymentIcon} string, The className for the icon of the payment platform
 * @param {takePercentage} number, the percentage of the final cost it will take
 * @param {takeBase} number, the base fee
 */
const BtnPayment: React.SFC<BtnProps> = (props) => {
  const { tickets, paymentPlatform, paymentIcon, takePercentage, takeBase } = props;
  let finalCost = 0.0;
  for (let ticket of tickets) {
    finalCost += (ticket.cost * ticket.quantity);
  }
  finalCost += (finalCost * takePercentage + takeBase);
  return (
    <button className='btn-payment button is-rounded'>
      <div className='text'><i className={paymentIcon}></i> Pay with {paymentPlatform}</div>
      <div className='amount'>${(finalCost + 0.005).toFixed(2)}</div>
    </button>
  );
}

interface Props {};
interface State {};

export default class UserInfo extends React.Component<Props, State> {
  makePurchase = (merchant: Merchant) => {
    console.log(merchant);
  }

  render() {
    return (
      <div id='user-info'>
        <div className='field'>
          <div className='label'>NAME</div>
          <div className='control'>
            <input className='rbs-input' type='text' placeholder='Adam Smith' />
          </div>
        </div>
        <div className='field'>
          <div className='label'>EMAIL</div>
          <div className='control'>
            <input className='rbs-input' type='text' placeholder='adamsmith@example.com' />
          </div>
        </div>
        <div className='field'>
          <div className='label'>PHONE</div>
          <div className='control'>
            <input className='rbs-input' type='text' placeholder='0400 000 000' />
          </div>
        </div>
        <div className='field'>
          <TicketContext.Consumer>{(tixManager) => (
            <React.Fragment>
              <BtnPayment
                tickets={tixManager !== null ? tixManager.getTickets() : []}
                paymentPlatform={'Paypal'}
                paymentIcon={'fab fa-cc-paypal'}
                takePercentage={0.026}
                takeBase={0.3}
                onClick={() => this.makePurchase(Merchant.PAYPAL)}
              />
              <BtnPayment
                tickets={tixManager !== null ? tixManager.getTickets() : []}
                paymentPlatform={'Stripe'}
                paymentIcon={'fab fa-cc-stripe'}
                takePercentage={0.0175}
                takeBase={0.3}
              />
            </React.Fragment>
          )}</TicketContext.Consumer>
        </div>
      </div>
    );
  }
};
