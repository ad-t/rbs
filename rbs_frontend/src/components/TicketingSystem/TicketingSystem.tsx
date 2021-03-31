/*
 * This file will handle information relating to the show
 */
import React from 'react';
import { Header, Icon, Step, Container, Menu, Image, Dropdown, List } from 'semantic-ui-react';

import BookTickets from './BookTickets';
import SelectShow from './SelectShow';
import SelectSeats from './SelectSeats';
import Invoice from './Invoice';
import ConfirmOrder from './ConfirmOrder';
import { ITicket, ITicketDetails } from '../../types/tickets';

interface Props {};
interface State {
  currentId: number;
  selectedShow: number;
  showStr: string;
  tickets: ITicket[];
  ticketDetails: ITicketDetails[];
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
  state = {
    currentId: 0,
    selectedShow: -1,
    showStr: '',
    tickets: [] as ITicket[],
    ticketDetails: [] as ITicketDetails[],
    details: null
  };

  goToSelectShow = () => {
    this.setState({ currentId: SELECT_SHOW });
  }

  updateShow = (selectedShow: number, showStr: string) => {
    // If selected show is different, reset ticket quantities and details.
    // This is because e.g. ticket types and available seats might be different.
    if (selectedShow !== this.state.selectedShow) {
      this.setState({ tickets: [], ticketDetails: [] });
    }
    this.setState({ currentId: BOOK_TICKETS, selectedShow, showStr });
  }

  goToSelectSeats = () => {
    this.setState({ currentId: SELECT_SEATS });
  }

  updateTickets = (tickets: ITicket[]) => {
    this.setState({ tickets });
  }

  updateTicketDetails = (ticketDetails: ITicketDetails[]) => {
    this.setState({ ticketDetails });
  }

  goToInvoice = () => {
    this.setState({ currentId: INVOICE });
  }

  updatePayment = (details: any) => {
    this.setState({ currentId: CONFIRM, details });
  }

  canGoBack(from: number, to: number) {
    return from > to && from !== CONFIRM;
  }

  goBackTo = (from: number, to: number) => {
    if (!this.canGoBack(from, to)) {
      return;
    }

    this.setState({ currentId: to });
  }

  render() {
    const { currentId, selectedShow } = this.state;
    let displayElm;

    switch (currentId) {
      case SELECT_SHOW:
        displayElm = <SelectShow updateShow={this.updateShow} />;
        break;
      case BOOK_TICKETS:
        displayElm = <BookTickets selectedShow={selectedShow} tickets={this.state.tickets} ticketDetails={this.state.ticketDetails}
          updateTickets={this.updateTickets} updateTicketDetails={this.updateTicketDetails} next={this.goToSelectSeats} />;
        break;
      case SELECT_SEATS:
        displayElm = <SelectSeats tickets={this.state.tickets} ticketDetails={this.state.ticketDetails}
          updateTickets={this.updateTickets} updateTicketDetails={this.updateTicketDetails}
          selectedShow={selectedShow} next={this.goToInvoice} />;
        break;
      case INVOICE:
        displayElm = <Invoice tickets={this.state.tickets} ticketDetails={this.state.ticketDetails}
          updateTicketDetails={this.updateTicketDetails} selectedShow={selectedShow} updatePayment={this.updatePayment}/>;
        break;
      case CONFIRM:
        displayElm = <ConfirmOrder showStr={this.state.showStr} tickets={this.state.tickets} ticketDetails={this.state.ticketDetails} details={this.state.details}/>;
        break;
    }

    const { canGoBack, goBackTo } = this;

    console.log(canGoBack(currentId, SELECT_SEATS));

    return (
      <React.Fragment>
      <Menu fixed='top' inverted>
    <Container>
      <Menu.Item header>
        <Image size='small' src='/logo.png' style={{ marginRight: '1.5em' }} />
      </Menu.Item>

      <Menu.Menu position='right'>
        <Menu.Item>
          <List>
            <List.Item><strong>Med Revue 2021</strong></List.Item>
            <List.Item><strong>Need help?</strong> ticketing@medrevue.org<br/>or contact us on <a href="https://www.facebook.com/MedRevue">Facebook</a></List.Item>
          </List>
        </Menu.Item>
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
          {/* FIXME: as long as onClick is present, link makes no difference */}
          <Step active={currentId === SELECT_SHOW} completed={currentId > SELECT_SHOW}
              link={canGoBack(currentId, SELECT_SHOW)} onClick={canGoBack(currentId, SELECT_SHOW) ? (() => goBackTo(currentId, SELECT_SHOW)) : undefined}>
            <Icon name='bullhorn'/>
            <Step.Content>
              <Step.Title>Show Night</Step.Title>
              <Step.Description>{this.state.showStr}</Step.Description>
            </Step.Content>
          </Step>
          <Step active={currentId === BOOK_TICKETS} completed={currentId > BOOK_TICKETS}
              link={canGoBack(currentId, BOOK_TICKETS)} onClick={canGoBack(currentId, BOOK_TICKETS) ? (() => goBackTo(currentId, BOOK_TICKETS)) : undefined}>
            <Icon name='ticket' />
            <Step.Content>
              <Step.Title>Tickets</Step.Title>
            </Step.Content>
          </Step>
          <Step active={currentId === SELECT_SEATS} completed={currentId > SELECT_SEATS}
              link={canGoBack(currentId, SELECT_SEATS)} onClick={canGoBack(currentId, SELECT_SEATS) ? (() => goBackTo(currentId, SELECT_SEATS)) : undefined}>
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
