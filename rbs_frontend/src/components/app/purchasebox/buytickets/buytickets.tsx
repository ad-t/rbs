/*
 * This file will handle the selecting of ticket numbers on the purchase box
 */
import React from 'react';
import { Redirect } from 'react-router-dom';

import { ITicketManager } from '../../../../types/tickets';

import TicketContext from '../../../../context/tickets';

// The selectedDate uid will correspond to a particular show day in the backend. This way, we are
// able to link the selected tickets. Also, we can use this uid to grab the ticket price.
interface Props {
  selectedDate: number
};

interface State {
  arcTicketUID: number,
  arcTickets: number,
  generalTicketUID: number,
  generalTickets: number,
  bought: boolean
};

enum TicketType {
  ArcTicket,
  GeneralTicket
}

export default class BuyTickets extends React.Component<Props, State> {
  state: State = {
    arcTicketUID: 0,
    arcTickets: 0,
    generalTicketUID: 1,
    generalTickets: 0,
    bought: false
  };

  buyTickets = (ticketManager: ITicketManager | null) => {
    const { arcTicketUID, arcTickets, generalTicketUID, generalTickets } = this.state;
    if (ticketManager === null) return;

    // Due to the asynch nature of setState, modification to the tickets state may be overridden.
    // Hence we are going to use promises to control the flow
    ticketManager.removeAllTickets().then(() => {
      /*
       * Fire the add ticket functions at the same time and wait till they finished updating the
       * tickets before we redirect the user.
       * 
       * Here is an interesting note. Both the add ticket functions will modify the ticket array
       * stored in the top most component. However, since they modify it using a reference, you
       * can launch both at the same time without fear of data being overridden. However, this is
       * not true for removeAllTickets, hence why we need to wait till it is finished before
       * proceeding to add tickets.
       */
      Promise.all([
        ticketManager.addTicket({
          uid: arcTicketUID,
          cost: 10,
          description: 'Arc Ticket',
          quantity: arcTickets
        }),
        ticketManager.addTicket({
          uid: generalTicketUID,
          cost: 12,
          description: 'General Tickets',
          quantity: generalTickets
        })
      ]).then(() => {
        this.setState({ bought: true });
      });
    });
  }

  modifyTicket = (amount: number, type: TicketType) => {
    // Will modify the number of tickets by an arbitary amount of ticket numbers. This allows for
    // ticket modifications to be easily reduced to a single function.
    const { arcTickets, generalTickets } = this.state;
    if (type === TicketType.ArcTicket) {
      if (arcTickets + amount >= 0)
        this.setState({arcTickets: arcTickets + amount});

    } else if (type === TicketType.GeneralTicket) {
      if (generalTickets + amount >= 0)
        this.setState({generalTickets: generalTickets + amount});
    }
  }

  componentDidUpdate = (prevProps: Props, prevState: State) => {
    if (this.props.selectedDate !== prevProps.selectedDate) {
      this.setState({arcTickets: 0, generalTickets: 0});
    }
  }

  render() {
    const { arcTickets, generalTickets, bought } = this.state;

    if (bought) return <Redirect to='/payment' />;

    return (
      <TicketContext.Consumer>{(tixManager) => (
        <div id='buy-tickets' className='animation-slide-from-right'>
          <div className='columns'>
            <div className='column'>
              <div className='card ticket-info'>
                <div className='ticket-title'>ARC Ticket</div>
                <div className='ticket-price'>
                  <span className='dollar'>$</span>
                  <span className='price'>10</span>
                  <span className='text'>/ Person</span>
                </div>
                <div className='ticket-group'><b>$10</b> for groups of 5 or more</div>
                <div className='ticket-numbers'>
                  <button
                    onClick={() => this.modifyTicket(-1, TicketType.ArcTicket)}
                    disabled={arcTickets === 0}
                  >
                    <i className='fas fa-minus'></i>
                  </button>
                  <span><b>{arcTickets}</b> Tickets</span>
                  <button onClick={() => this.modifyTicket(1, TicketType.ArcTicket)}>
                    <i className='fas fa-plus'></i>
                  </button>
                </div>
              </div>
            </div>
            <div className='column'>
              <div className='card ticket-info'>
                <div className='ticket-title'>General Ticket</div>
                <div className='ticket-price'>
                  <span className='dollar'>$</span>
                  <span className='price'>12</span>
                  <span className='text'>/ Person</span>
                </div>
                <div className='ticket-group'><b>$10</b> for groups of 5 or more</div>
                <div className='ticket-numbers'>
                  <button
                    onClick={() => this.modifyTicket(-1, TicketType.GeneralTicket)}
                    disabled={generalTickets === 0}
                  >
                    <i className='fas fa-minus'></i>
                  </button>
                  <span><b>{generalTickets}</b> Tickets</span>
                  <button onClick={() => this.modifyTicket(1, TicketType.GeneralTicket)}>
                    <i className='fas fa-plus'></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              id='purchase-tickets'
              className='button is-rounded'
              onClick={() => this.buyTickets(tixManager)}
            >PURCHASE</button>
          </div>
        </div>
      )}
      </TicketContext.Consumer>
    );
  }
};
