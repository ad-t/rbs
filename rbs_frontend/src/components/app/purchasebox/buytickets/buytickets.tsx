import React from 'react';

interface Props {};
interface State {};

export default class BuyTickets extends React.Component<Props, State> {
  render() {
    return (
      <div id='buy-tickets'>
        <div className='columns'>
          <div className='column'>
            <div className='card ticket-info'>
              <div className='ticket-title'>ARC Ticket</div>
              <div className='ticket-price'>
                <span className='dollar'>$</span>
                <span className='price'>10</span>
                <span className='text'>/ Person</span>
              </div>
              <div className='ticket-group'>$10 for groups of 5 or more</div>
              <div className='ticket-numbers'>
                <button><i className='fas fa-minus'></i></button>
                <span>0 Tickets</span>
                <button><i className='fas fa-plus'></i></button>
              </div>
            </div>
          </div>
          <div className='column'>
            <div className='card ticket-info'>
              <div className='ticket-title'>General Ticket</div>
              <div className='ticket-price'>
                <span className='dollar'>$</span>
                <span className='price'>12</span>
                <span className='text'>/ Person</span>
              </div>
              <div className='ticket-group'>$10 for groups of 5 or more</div>
              <div className='ticket-numbers'>
                <button><i className='fas fa-minus'></i></button>
                <span>0 Tickets</span>
                <button><i className='fas fa-plus'></i></button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button id='purchase-tickets' className='button is-rounded'>PURCHASE</button>
        </div>
      </div>
    );
  }
};
