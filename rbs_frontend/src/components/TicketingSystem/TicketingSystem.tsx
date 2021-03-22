/*
 * This file will handle information relating to the show
 */
import React from 'react';
import { Header, Icon, Step, Container, Menu, Image, Dropdown } from 'semantic-ui-react';

import BookTickets from './BookTickets';
import SelectShow from './SelectShow';
import SelectSeats from './SelectSeats';
import Invoice from './Invoice';
import ConfirmOrder from './ConfirmOrder';
import { ITicket } from '../../types/tickets';

interface Props {};
interface State {
  currentId: number;
  selectedShow: number;
  tickets: Array<ITicket>;
  details: any;
};

const SELECT_SHOW = 0;
const BOOK_TICKETS = 1;
const SELECT_SEATS = 2;
const INVOICE = 3;
const CONFIRM = 4;

export default class TicketingSystem extends React.Component<Props, State> {
  // This may be changed during testing. Default values should be:
  // currentId: 0, selectedShow: -1
  state = { currentId: 0, selectedShow: -1, tickets: [], details: null };

  updateShow = (selectedShow: number) => {
    this.setState({ currentId: BOOK_TICKETS, selectedShow });
  }

  updateTickets = (tickets: Array<ITicket>) => {
    this.setState({ currentId: SELECT_SEATS, tickets });
  }

  updateSeats = (tickets: Array<ITicket>) => {
    this.setState({ currentId: INVOICE, tickets });
  }

  updatePayment = (details: any) => {
    this.setState({ currentId: CONFIRM, details });
  }

  render() {
    const { currentId, selectedShow } = this.state;
    let displayElm;

    switch (currentId) {
      case SELECT_SHOW:
        displayElm = <SelectShow updateShow={this.updateShow} />;
        break;
      case BOOK_TICKETS:
        displayElm = <BookTickets selectedShow={selectedShow} updateTickets={this.updateTickets} />;
        break;
      case SELECT_SEATS:
        displayElm = <SelectSeats tickets={this.state.tickets} selectedShow={selectedShow} updateSeats={this.updateSeats} />;
        break;
      case INVOICE:
        displayElm = <Invoice tickets={this.state.tickets} selectedShow={selectedShow} updatePayment={this.updatePayment}/>;
        break;
      case CONFIRM:
        displayElm = <ConfirmOrder details={this.state.details}/>;
        break;
    }

    return (
      <React.Fragment>
      <Menu fixed='top' inverted>
    <Container>
      <Menu.Item header>
        <Image size='small' src='/logo.png' style={{ marginRight: '1.5em' }} />
      </Menu.Item>

      <Menu.Menu position='right'>
        {/* TODO: dynamically load events */}
        {/*
        <Dropdown item simple text='Select Event&hellip;'>
          <Dropdown.Menu>
            <Dropdown.Header>Events</Dropdown.Header>

            <Dropdown.Item>Med Revue 2021</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>More Actions</Dropdown.Header>
            <Dropdown.Item>Create Event</Dropdown.Item>
            <Dropdown.Item>Event List</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        */}
        <Menu.Item><strong>Med Revue 2021</strong></Menu.Item>
        <Menu.Item>
          <Image size='tiny' src='/covid-safe-logo.png' />
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>

      <Container style={{position: "relative", paddingTop:"7.5em", minHeight: "100%", background: "#eee"}}>
        <Header as='h2' style={{margin: 0, padding: '1em 0.5em 0em'}}>
          <Icon name='shop'/>
          <Header.Content>
            Med Revue 2021 Tickets
            <Header.Subheader>Place your order for a seat to Breaking Bones</Header.Subheader>
          </Header.Content>
        </Header>
        <div style={{margin: "1em 1em"}}>
        <Step.Group size='mini' widths={5} unstackable>
          <Step active={currentId === SELECT_SHOW} completed={currentId > SELECT_SHOW}>
            <Icon name='bullhorn'/>
            <Step.Content>
              <Step.Title>Show Night</Step.Title>
            </Step.Content>
          </Step>
          <Step active={currentId === BOOK_TICKETS} completed={currentId > BOOK_TICKETS}>
            <Icon name='ticket' />
            <Step.Content>
              <Step.Title>Tickets</Step.Title>
            </Step.Content>
          </Step>
          <Step active={currentId === SELECT_SEATS} completed={currentId > SELECT_SEATS}>
            <Icon name='map marker' />
            <Step.Content>
              <Step.Title>Seats</Step.Title>
            </Step.Content>
          </Step>
          <Step active={currentId === INVOICE} completed={currentId > INVOICE}>
            <Icon name='payment' />
            <Step.Content>
              <Step.Title>Billing</Step.Title>
            </Step.Content>
          </Step>
          <Step active={currentId === CONFIRM} completed={currentId > CONFIRM}>
            <Icon name='info' />
            <Step.Content>
              <Step.Title>Confirm Order</Step.Title>
            </Step.Content>
          </Step>
        </Step.Group>
        </div>
        {displayElm}
      </Container>
      </React.Fragment>
    );
  }
};
