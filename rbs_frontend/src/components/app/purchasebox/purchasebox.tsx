/*
 * This file will handle the purchase box element on the landing page.
 */
import React from 'react';
import Calendar from './calendar';
import BuyTicket from './buytickets';

import MrLogo from '../../../assets/img/mr-logo.jpg';

interface Props {};
interface State {};

export default class PurchaseBox extends React.Component<Props, State> {
  render() {
    return (
      <div id='purchase-box'>
        <div id='revue-brand'>
          <img src={MrLogo} />
          <div id='text-wrapper'>
            <span id='title'>BOOK FOR MED REVUE</span>
            <span id='subtitle'>17th - 20th April</span>
          </div>
        </div>
        <div id='info-bar'>
          <div className='info'>
            <span className='icon is-large'><i className='fas fa-3x fa-map-marker'></i></span>
            <span className='text'>UNSW Science Threatre</span>
          </div>
          <div className='info'>
            <span className='icon is-large'><i className='far fa-3x fa-clock'></i></span>
            <span className='text'>7:00 PM Start</span>
          </div>
        </div>
        <div id='date-selector'>
          <div className='select'>
            <select>
              <option>Select a date to view the show ...</option>
              <option>17th April - Wednesday</option>
              <option>18th April - Thursday</option>
            </select>
          </div>
        </div>
        <BuyTicket />
      </div>
    );
  }
};
