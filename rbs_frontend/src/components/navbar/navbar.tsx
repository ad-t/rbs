import React from 'react';
import { Link } from 'react-router-dom';

interface Props {};

interface State {
  navExpanded: boolean;
};

export default class Navbar extends React.Component<Props, State> {
  state: State = {
    navExpanded: false,
  };

  toggleNav = () => {
    this.setState({ navExpanded: !this.state.navExpanded });
  }

  render() {
    const { navExpanded } = this.state;

    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
          </a>

          <a
            role="button"
            className={"navbar-burger burger " + (navExpanded ? "is-active" : "")}
            aria-label="menu"
            aria-expanded="false"
            onClick={this.toggleNav}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          className={"navbar-menu " + (navExpanded ? "is-active" : "")}
        >
          <div className="navbar-start">
            <a className="navbar-item"><Link to="/">Home</Link></a>
            <a className="navbar-item"><Link to="/aboutus">About Us</Link></a>
            <a className="navbar-item"><Link to="/">Why RBS</Link></a>
          </div>
        </div>
      </nav>
    );
  }
};
