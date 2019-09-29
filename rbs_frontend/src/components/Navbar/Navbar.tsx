/*
 * This file will handle the entire landing page.
 */
import React from 'react';

import { FaBars } from 'react-icons/fa';

export default class Navbar extends React.Component<{}, {}> {
  state = { ticketSales: 0, expanded: false };

  toggleNavbar = () => {
    let { expanded } = this.state;
    expanded = !expanded;
    this.setState({ expanded });
  }

  render() {
    const { expanded } = this.state;

    return (
      <div className="rbs-sticky-top bg-primary w-100 ph3 pv3 pv4-l">
        <nav className="f6 fw6 ttu tracked dn db-l">
          <a className="link dim white dib mr3" href="#">Home</a>
          <a className="link dim white dib mr3" href="#">Tickets</a>
          <a className="link dim white dib mr3" href="#">About Us</a>
        </nav>
        <button className="rbs-hamburger flex link white dn-l" onClick={this.toggleNavbar}>
          <FaBars />
        </button>
        <nav className="rbs-mobile-menu f6 fw6 ttu tracked" hidden={!expanded}>
          <a className="link dim white db pv1 mv1" href="#">Home</a>
          <a className="link dim white db pv1 mb1" href="#">Tickets</a>
          <a className="link dim white db pv1 mb1" href="#">About Us</a>
        </nav>
      </div>
    );
  }
};
