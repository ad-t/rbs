/*
 * This file will handle the landing page.
 */
import React from 'react';
import PurchaseBox from './purchasebox';

interface Props {};
interface State {};

export default class App extends React.Component<Props, State> {
  render() {
    return (
      <section className="hero is-fullheight-with-navbar rbs-app-bg">
        <div className="hero-body">
          <div className="container is-fluid">
            <div className="columns">
              <div className="column">
                First column
              </div>
              <div className="column">
                <PurchaseBox />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
};
