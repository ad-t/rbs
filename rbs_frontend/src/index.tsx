import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import Navbar from './components/navbar';
import './assets/scss/main.scss';
import * as serviceWorker from './serviceWorker';

interface Props {};
interface State {};

class Index extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <Navbar />
      </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
