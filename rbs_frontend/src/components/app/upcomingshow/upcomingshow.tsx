import React from 'react';
import MRShowLogo from '../../../assets/img/mr19show.png';

import FAASTLogo from '../../../assets/img/logo-faast.png';
import CSELogo from '../../../assets/img/logo-cse.png';

interface Props {};
interface State {};

export default class UpcomingShow extends React.Component<Props, State> {
  render() {
    return (
      <div id='upcoming-show'>
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
