import React from 'react';

import { ITicket } from '../../../types/tickets';
import TicketContext from '../../../context/tickets';

interface BtnProps {
  tickets: Array<ITicket>;
  paymentPlatform: string,
  paymentIcon: string,
  takePercentage: number,
  takeBase: number
};

/*
 * This component is here to help render out the payment buttons
 * The component takes in the following properties:
 * tickets: Array<ITickets>, The array of tickets purchased
 * paymentPlatform: string, The name of the payment platform you are using
 * paymentIcon: string, The className for the icon of the payment platform
 * takePercentage: number, the percentage of the final cost it will take
 * takeBase: number, the base fee
 * 
 * The final cost will be determined by finalCost + (finalCost * takePercentage) + takeBase
 */
const BtnPayment: React.SFC<BtnProps> = (props) => {
  const { tickets, paymentPlatform, paymentIcon, takePercentage, takeBase } = props;
  let finalCost = 0.0;
  for (let ticket of tickets) {
    finalCost += (ticket.cost * ticket.quantity);
  }
  finalCost += (finalCost * takePercentage + takeBase);
  return (
    <div className='btn-payment button is-rounded'>
      <div className='text'><i className={paymentIcon}></i> Pay with {paymentPlatform}</div>
      <div className='amount'>${(finalCost + 0.005).toFixed(2)}</div>
    </div>
  );
}

interface Props {};
interface State {};

export default class UserInfo extends React.Component<Props, State> {
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
