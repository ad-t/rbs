/*
 * This is where the magic happens.
 * The index file connects all of the pages together and holds the memory for the ticketing
 * information.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Import our custom components
import Navbar from './components/navbar';
import App from './components/app';
import AboutUs from './components/aboutus';
import Payment from './components/payment';

// Import types
import { ITicket } from './types/tickets';
import TicketContext from './context/tickets';

// Import assets (e.g. scss)
import './assets/scss/main.scss';
import * as serviceWorker from './serviceWorker';
import { resolve } from 'dns';

interface Props {};
interface State {
  tickets: Array<ITicket>,
  addTicket(ticket: ITicket): Promise<boolean>,
  getTickets(): Array<ITicket>,
  modifyQuantity(uid: number, amount: number): Promise<boolean>,
  removeTicket(uid: number): Promise<boolean>,
  removeAllTickets(): Promise<boolean>
};

class Index extends React.Component<Props, State> {
  
  addTicket = (ticket: ITicket): Promise<boolean> => {
    // Add a ticket object to the ticketing array
    return new Promise((resolve, reject) => {
      const { tickets } = this.state;
      console.log(tickets);
      tickets.push(ticket);
      this.setState({ tickets }, () => resolve(true));
    });
  }
  
  getTicket = () => {
    return this.state.tickets;
  }
  
  modifyTicketQuantity = (uid: number, amount: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      // Modify the amount of tickets purchased using its uid
      const { tickets } = this.state;
      const ticket = tickets.find((ticket) => ticket.uid === uid);
      // The find function will either return the ticket object or undefined if the uid is incorrect.
      // If we found a ticket object, we will modify its quantity by the amount parameter. To make
      // the quantity never drops below 0, we will use the Math.max with 0 as a parameter.
      if (ticket !== undefined) ticket.quantity = Math.max(ticket.quantity += amount, 0);
      this.setState({ tickets }, () => resolve(true));
    });
  }
  
  removeTicket = (uid: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const { tickets } = this.state;
      const tixIndex = tickets.findIndex((ticket) => ticket.uid === uid);
      // Find the index of the ticket we want to remove. We will then use the index to remove the
      // ticket from the array. findIndex will return -1 if it doesn't find the ticket.
      if (tixIndex >= 0) tickets.splice(tixIndex, 1);
      this.setState({ tickets }, () => resolve(true));
    });
  }
  
  removeAllTickets = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      this.setState({ tickets: [] }, () => resolve(true));
    });
  }
  
  state: State = {
    tickets: [],
    addTicket: this.addTicket,
    getTickets: this.getTicket,
    modifyQuantity: this.modifyTicketQuantity,
    removeTicket: this.removeTicket,
    removeAllTickets: this.removeAllTickets
  }

  render() {
    return (
      <Router>
        <Navbar />
        <TicketContext.Provider value={this.state}>
          <Route exact path='/' component={App} />
          <Route path='/aboutus' component={AboutUs} />
          <Route path='/payment' component={Payment} />
        </TicketContext.Provider>
      </Router>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
