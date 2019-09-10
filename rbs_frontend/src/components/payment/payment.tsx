import React from 'react';

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
                <div className='info-column'>d</div>
                <div id='border'></div>
                <div className='info-column'>d</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
};