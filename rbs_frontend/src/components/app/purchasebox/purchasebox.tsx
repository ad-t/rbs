/*
 * This file will handle the purchase box element on the landing page.
 */
import React, { ChangeEvent } from 'react';
import Calendar from './calendar';
import BuyTicket from './buytickets';

import MrLogo from '../../../assets/img/mr-logo.jpg';

interface Props {};
// We have set up the state to accept a selectedDate parameter. This selected date will correspond
// to the uid of a particular day in the backend. The uid for the date should be restricted to
// always be >= 0, allowing us to use -1 as a flag for having no dates selected.
interface State {
  selectedDate: number,
  location: string,
  showTime: string,
};

export default class PurchaseBox extends React.Component<Props, State> {
  state: State = {
    location: 'UNSW Science Threatre',
    selectedDate: -1,
    showTime: 'Select a date first'
  }

  onSelectDate = (e: ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selectedDate: parseInt(e.target.value) });
  }

  render() {
    const { location, selectedDate, showTime } = this.state;
    let displayElm = <Calendar />;

    if ( selectedDate >= 0 ) {
      displayElm = <BuyTicket selectedDate={selectedDate} />;
    }

    return (
      <div id='purchase-box' className='animation-slide-from-right'>
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
            <span className='text'>{location}</span>
          </div>
          <div className='info'>
            <span className='icon is-large'><i className='far fa-3x fa-clock'></i></span>
            <span className='text'>{showTime}</span>
          </div>
        </div>
        <div id='date-selector'>
          <div className='select'>
            <select onChange={this.onSelectDate}>
              <option value='-1'>Select a date to view the show ...</option>
              <option value='0'>17th April - Wednesday</option>
              <option value='1'>18th April - Thursday</option>
            </select>
          </div>
        </div>
        {displayElm}
      </div>
    );
  }
};
