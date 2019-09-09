import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import App from './components/app';
import AboutUs from './components/aboutus';
import './assets/scss/main.scss';
import * as serviceWorker from './serviceWorker';

interface Props {};
interface State {};

class Index extends React.Component<Props, State> {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path='/' component={App} />
          <Route path='/aboutus' component={AboutUs} />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
