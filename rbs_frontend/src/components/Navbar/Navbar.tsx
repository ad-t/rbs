/*
 * This file will handle the entire landing page.
 */
import React from 'react';
import { Link } from 'react-router-dom';

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
      <React.Fragment>
        <div>
          <button
            className="rbs-hamburger absolute top-0 bg-primary flex link white"
            onClick={this.toggleNavbar}
            data-toggled={expanded}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className="navigation-menu absolute left-0 h-100 w-75" hidden={!expanded}>
          <div className="flex flex-column">
            <Link className="no-underline mb3" to="/">Home</Link>
            <Link className="no-underline mb3" to="/">Ticketing</Link>
            <Link className="no-underline mb3" to="/">About Us</Link>
          </div>
        </div>
        <div className="navigation-overlay absolute w-100 h-100" hidden={!expanded}></div>
      </React.Fragment>
    );
  }
};
