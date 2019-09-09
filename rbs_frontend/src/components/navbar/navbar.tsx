import React from 'react';

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
            <a className="navbar-item">Home</a>
            <a className="navbar-item">Documentation</a>
          </div>
        </div>
      </nav>
    );
  }
}
