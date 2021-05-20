/*
 * This file will handle information relating to the show
 */
import React from 'react';
import { Icon, Container, Image } from 'semantic-ui-react';

import { BookingHeader } from 'src/components/Header/Header';
import { createSteps } from 'src/components/Steps/create';
import StepItem from 'src/components/Steps/StepItem';
import { StepItemState } from 'src/shared/enums';
import * as mobxReact from 'mobx-react-lite';
import { installTickets } from 'src/mocks/installTickets';
import { TicketingSystemState } from 'src/components/TicketingSystem/TicketingSystem.state';
import { createTicket } from 'src/components/Ticket/create';

import BookTickets from 'src/pages/BookTickets';
import SelectShow from './SelectShow';
import SelectSeats from './SelectSeats';
// import Invoice from './Invoice';
import ConfirmOrder from '../../pages/ConfirmOrder';
import { ITicket, ITicketDetails } from '../../types/tickets';
import { IDiscount } from '../../types/discount';

import LogoImage from './logo.png';

interface State {
  currentId: number;
  selectedShow: number;
  showStr: string;
  tickets: ITicket[];
  ticketDetails: ITicketDetails[];
  discount: IDiscount | null;
  details: any;
}

const SELECT_SHOW = 0;
const BOOK_TICKETS = 1;
const SELECT_SEATS = 2;
const INVOICE = 3;
const CONFIRM = 4;

const iconStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0,
};

function filterStepState(state: number, index: number) {
  if (state === index) return StepItemState.IN_PROGRESS;
  if (state > index) return StepItemState.COMPLETED;
  return StepItemState.NOT_STARTED;
}
export const ticketingSystemState = new TicketingSystemState();

const BookTicketsWrapper = mobxReact.observer(() => {
  const { ticketElements, ticketStates } = ticketingSystemState;
  const totalPrice = ticketStates.reduce(
    (total, state) => total + state.value * state.cost,
    0
  );

  return <BookTickets tickets={ticketElements} totalPrice={totalPrice} />;
});

export default class TicketingSystem extends React.Component<
  Record<string, never>,
  State
> {
  // This may be changed during testing. Default values should be:
  // currentId: 0, selectedShow: -1
  state = {
    currentId: 1,
    selectedShow: -1,
    showStr: '',
    tickets: [] as ITicket[],
    ticketDetails: [] as ITicketDetails[],
    discount: null,
    details: null,
  };

  private Steps = createSteps([
    <StepItem
      icon={<Icon name="bullhorn" style={iconStyles} />}
      name="Show Night"
    />,
    <StepItem
      icon={<Icon name="ticket" style={iconStyles} />}
      name="Tickets"
    />,
    <StepItem
      icon={<Icon name="map marker" style={iconStyles} />}
      name="Seats"
    />,
    <StepItem
      icon={<Icon name="payment" style={iconStyles} />}
      name="Billing"
    />,
    <StepItem
      icon={<Icon name="info" style={iconStyles} />}
      name="Confirm Order"
    />,
  ]);

  componentDidMount() {
    installTickets().then((tickets: ITicket[]) => {
      console.log(tickets);
      tickets.forEach((ticket) => {
        const { Ticket, ticketState } = createTicket({
          name: ticket.description,
          cost: ticket.price,
          minPurchase: ticket.minPurchaseAmount,
          initialAmount: 0,
        });

        ticketingSystemState.addTicket(<Ticket />, ticketState);
      });
    });
  }

  goToSelectShow = () => {
    this.setState({ currentId: SELECT_SHOW });
  };

  updateShow = (selectedShow: number, showStr: string) => {
    // If selected show is different, reset ticket quantities and details.
    // This is because e.g. ticket types and available seats might be different.
    if (selectedShow !== this.state.selectedShow) {
      this.setState({ tickets: [], ticketDetails: [], discount: null });
    }
    this.setState({ currentId: BOOK_TICKETS, selectedShow, showStr });
  };

  goToSelectSeats = () => {
    this.setState({ currentId: SELECT_SEATS });
  };

  updateTickets = (tickets: ITicket[]) => {
    this.setState({ tickets });
  };

  updateTicketDetails = (ticketDetails: ITicketDetails[]) => {
    this.setState({ ticketDetails });
  };

  updateDiscount = (discount: IDiscount | null) => {
    this.setState({ discount });
  };

  goToInvoice = () => {
    this.setState({ currentId: INVOICE });
  };

  updatePayment = (details: any) => {
    this.setState({ currentId: CONFIRM, details });
  };

  render() {
    const { currentId, selectedShow } = this.state;
    const { StepsElement, stepsState } = this.Steps;
    let displayElm;

    switch (currentId) {
      case SELECT_SHOW:
        displayElm = <SelectShow updateShow={this.updateShow} />;
        break;
      case BOOK_TICKETS:
        displayElm = <BookTicketsWrapper />;
        break;
      case SELECT_SEATS:
        displayElm = (
          <SelectSeats
            tickets={this.state.tickets}
            ticketDetails={this.state.ticketDetails}
            discount={this.state.discount}
            updateTickets={this.updateTickets}
            updateTicketDetails={this.updateTicketDetails}
            selectedShow={selectedShow}
            next={this.goToInvoice}
          />
        );
        break;
      case INVOICE:
        displayElm = <div>Invoice Stub</div>;
        break;
      case CONFIRM:
        displayElm = (
          <ConfirmOrder
            showStr={this.state.showStr}
            tickets={this.state.tickets}
            ticketDetails={this.state.ticketDetails}
            details={this.state.details}
            discount={this.state.discount}
          />
        );
        break;
    }

    stepsState.itemsProgress[0] = filterStepState(currentId, 0);
    stepsState.itemsProgress[1] = filterStepState(currentId, 1);
    stepsState.itemsProgress[2] = filterStepState(currentId, 2);
    stepsState.itemsProgress[3] = filterStepState(currentId, 3);
    stepsState.itemsProgress[4] = filterStepState(currentId, 4);

    return (
      <>
        <BookingHeader
          Logo={
            <Image
              size="small"
              src={LogoImage}
              style={{ marginRight: '1.5em' }}
            />
          }
          email="ticketing@medrevue.org"
          showName="Med Revue 2021"
        />

        <Container
          style={{
            position: 'relative',
            padding: '1rem',
          }}
        >
          <div style={{ marginBottom: '2rem' }}>
            <StepsElement />
          </div>

          {displayElm}
        </Container>
      </>
    );
  }
}
