/*
 * This file will handle information relating to the show
 */
import React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { Icon, Container, Image } from 'semantic-ui-react';
import { BookingHeader } from 'src/components/Header/Header';
import { createTicket } from 'src/components/Ticket/create';
import { createSteps } from 'src/components/Steps/create';
import StepItem from 'src/components/Steps/StepItem';
import { TicketingSystemState } from 'src/components/TicketingSystem/TicketingSystem.state';
import BookTickets from 'src/pages/BookTickets';
import SelectShow from 'src/pages/SelectShow';
import { installShowNights } from 'src/mocks/installShows';
import { installTickets } from 'src/mocks/installTickets';
import { StepItemState, TicketSystemState } from 'src/shared/enums';
import { ShowNight } from 'src/shared/types';

import SelectSeats from '../../pages/SelectSeats';
// import Invoice from './Invoice';
import ConfirmOrder from '../../pages/ConfirmOrder';
import { ITicket, ITicketDetails } from '../../types/tickets';
import { IDiscount } from '../../types/discount';

import LogoImage from './logo.png';

interface State {
  currentId: TicketSystemState;
  selectedShow: number;
  showStr: string;
  tickets: ITicket[];
  ticketDetails: ITicketDetails[];
  discount: IDiscount | null;
  details: any;
}

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

const ShowNightWrapper = mobxReact.observer(() => (
  <SelectShow
    showNights={ticketingSystemState.showNights}
    updateShow={() => console.log('Called')}
  />
));

const BookTicketsWrapper = mobxReact.observer(() => {
  const { ticketElements, ticketStates } = ticketingSystemState;
  const totalPrice = ticketStates.reduce(
    (total, state) => total + state.value * state.cost,
    0
  );
  const preventProceed =
    ticketStates.reduce((total, state) => total + state.value, 0) === 0;

  return (
    <BookTickets
      tickets={ticketElements}
      totalPrice={totalPrice}
      preventProceed={preventProceed}
    />
  );
});

export default class TicketingSystem extends React.Component<
  Record<string, never>,
  State
> {
  // This may be changed during testing. Default values should be:
  // currentId: 0, selectedShow: -1
  state = {
    currentId: TicketSystemState.SELECT_SEATS,
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
    // eslint-disable-next-line
    // @ts-ignore
    window.ticketingSystemState = ticketingSystemState;

    installShowNights().then((showNights: ShowNight[]) => {
      ticketingSystemState.setShowNights(showNights);
    });

    installTickets().then((tickets: ITicket[]) => {
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
    this.setState({ currentId: TicketSystemState.SELECT_SHOW });
  };

  updateShow = (selectedShow: number, showStr: string) => {
    // If selected show is different, reset ticket quantities and details.
    // This is because e.g. ticket types and available seats might be different.
    if (selectedShow !== this.state.selectedShow) {
      this.setState({ tickets: [], ticketDetails: [], discount: null });
    }
    this.setState({
      currentId: TicketSystemState.BOOK_TICKETS,
      selectedShow,
      showStr,
    });
  };

  goToSelectSeats = () => {
    this.setState({ currentId: TicketSystemState.SELECT_SEATS });
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
    this.setState({ currentId: TicketSystemState.INVOICE });
  };

  updatePayment = (details: any) => {
    this.setState({ currentId: TicketSystemState.CONFIRM, details });
  };

  render() {
    const { currentId } = this.state;
    const { StepsElement, stepsState } = this.Steps;
    let displayElm;

    switch (currentId) {
      case TicketSystemState.SELECT_SHOW:
        displayElm = <ShowNightWrapper />;
        break;
      case TicketSystemState.BOOK_TICKETS:
        displayElm = <BookTicketsWrapper />;
        break;
      case TicketSystemState.SELECT_SEATS:
        displayElm = <SelectSeats selectedSeats={['1']} />;
        break;
      case TicketSystemState.INVOICE:
        displayElm = <div>Invoice Stub</div>;
        break;
      case TicketSystemState.CONFIRM:
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
