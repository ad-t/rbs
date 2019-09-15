/*
 * This file will contain the code for showing the logo for the next upcoming show and the sponsors
 * for the particular show.
 */
import React from 'react';
import MRShowLogo from '../../../assets/img/mr19show.png';

import FAASTLogo from '../../../assets/img/logo-faast.png';
import CSELogo from '../../../assets/img/logo-cse.png';

interface Props {};
interface State {};

export default class UpcomingShow extends React.Component<Props, State> {
  render() {
    return (
      <div id='upcoming-show' className='animation-slide-from-top'>
        <div id='title'>UPCOMING SHOW</div>
        <div id='logo'>
          <img src={MRShowLogo} alt='show-logo' />
        </div>
        <div id='sponsors-title'>SPONSORS</div>
        <div id='sponsors'>
          <img src={FAASTLogo} alt='FAAST Logo' />
          <img src={CSELogo} alt='CSE Logo' />
        </div>
      </div>
    );
  }
};
