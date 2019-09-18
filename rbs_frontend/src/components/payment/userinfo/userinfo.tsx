import React, { MouseEventHandler } from 'react';
import validator from 'validator';

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
  onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
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
  const { tickets, paymentPlatform, paymentIcon, takePercentage, takeBase, onClick } = props;
  let finalCost = 0.0;
  for (let ticket of tickets) {
    finalCost += (ticket.cost * ticket.quantity);
  }
  finalCost += (finalCost * takePercentage + takeBase);
  return (
    <button className='btn-payment button is-rounded' onClick={onClick}>
      <div className='text'><i className={paymentIcon}></i> Pay with {paymentPlatform}</div>
      <div className='amount'>${(finalCost + 0.005).toFixed(2)}</div>
    </button>
  );
}

interface Props {};
interface State {};

export default class UserInfo extends React.Component<Props, State> {
  private nameRef: React.RefObject<HTMLInputElement>;
  private emailRef: React.RefObject<HTMLInputElement>;
  private phoneRef: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);

    this.nameRef = React.createRef();
    this.emailRef = React.createRef();
    this.phoneRef = React.createRef();
  }

  makePurchase = (merchant: Merchant) => {
    let validForm = true;

    if (this.nameRef.current && this.emailRef.current && this.phoneRef.current) {
      const nameObj = this.nameRef.current.querySelector('.rbs-input');
      const emailObj = this.emailRef.current.querySelector('.rbs-input');
      const phoneObj = this.phoneRef.current.querySelector('.rbs-input');

      const nameError = this.nameRef.current.querySelector('.rbs-form-error');
      const emailError = this.emailRef.current.querySelector('.rbs-form-error');
      const phoneError = this.phoneRef.current.querySelector('.rbs-form-error');

      if (nameObj && emailObj && phoneObj) {
        const name = (nameObj as HTMLInputElement).value;
        const email = (emailObj as HTMLInputElement).value;
        const phone = (phoneObj as HTMLInputElement).value.replace(/\s+/g, '');

        if (!validator.isLength(name, {min: 1, max: undefined})) {
          if (nameError) (nameError as HTMLElement).hidden = false;
          validForm = false;
        } else {
          if (nameError) (nameError as HTMLElement).hidden = true;
        }

        if (!validator.isEmail(email)) {
          if (emailError) (emailError as HTMLElement).hidden = false;
          validForm = false;
        } else {
          if (emailError) (emailError as HTMLElement).hidden = true;
        }

        if (!validator.isMobilePhone(phone, 'en-AU')) {
          if (phoneError) (phoneError as HTMLElement).hidden = false;
          validForm = false;
        } else {
          if (phoneError) (phoneError as HTMLElement).hidden = true;
        }
      }
    }
  }

  render() {
    return (
      <div id='user-info'>
        <div className='field' ref={this.nameRef}>
          <div className='label'>NAME</div>
          <div className='control'>
            <input className='rbs-input' type='text' placeholder='Adam Smith' />
          </div>
          <div className='rbs-form-error-wrapper'>
            <div className='rbs-form-error' hidden>You need to enter a name!</div>
          </div>
        </div>
        <div className='field' ref={this.emailRef}>
          <div className='label'>EMAIL</div>
          <div className='control'>
            <input className='rbs-input' type='text' placeholder='adamsmith@example.com' />
          </div>
          <div className='rbs-form-error-wrapper'>
            <div className='rbs-form-error' hidden>You need to enter a valid email!</div>
          </div>
        </div>
        <div className='field' ref={this.phoneRef}>
          <div className='label'>PHONE</div>
          <div className='control'>
            <input className='rbs-input' type='text' placeholder='0400 000 000' />
          </div>
          <div className='rbs-form-error-wrapper'>
            <div className='rbs-form-error' hidden>You need to enter a valid Australian phone!</div>
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
                onClick={(event) => this.makePurchase(Merchant.PAYPAL)}
              />
              <BtnPayment
                tickets={tixManager !== null ? tixManager.getTickets() : []}
                paymentPlatform={'Stripe'}
                paymentIcon={'fab fa-cc-stripe'}
                takePercentage={0.0175}
                takeBase={0.3}
                onClick={(e) => this.makePurchase(Merchant.STRIPE)}
              />
            </React.Fragment>
          )}</TicketContext.Consumer>
        </div>
      </div>
    );
  }
};
