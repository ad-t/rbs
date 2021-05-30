import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react-lite';
import { Icon } from 'semantic-ui-react';
import { createSteps } from 'src/components/Steps/create';
import { createSeating } from 'src/components/Seating/create';
import StepItem from 'src/components/Steps/StepItem';
import {
  UserState,
  TicketingSystemState,
} from 'src/components/TicketingSystem/TicketingSystem.state';
import { saveShowNights } from 'src/mocks/installShows';
import { installTickets } from 'src/mocks/installTickets';
import { ITicket } from 'src/types/tickets';
import { ShowNight } from 'src/shared/types';
import SelectShow from 'src/pages/SelectShow';
import BookTickets from 'src/pages/BookTickets';
import SelectSeats from 'src/pages/SelectSeats';
import { TicketingSystem } from './TicketingSystem';
import { TicketingSystemController } from './TicketingSystem.controller';

const iconStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0,
};

export function createTicketingSystem() {
  const ticketingSystemController = new TicketingSystemController();
  const ticketingSystemState = new TicketingSystemState();
  const userState = new UserState();

  const { StepsElement, stepController, stepsState } = createSteps([
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

  const { SeatingElement, seatingState } = createSeating(0);

  const updateShow = mobx.action((showId: number) => {
    userState.selectedShow = showId;
    ticketingSystemController.advanceStep(ticketingSystemState);
    stepController.advance(stepsState);
  });

  const retract = mobx.action(() => {
    ticketingSystemController.retractStep(ticketingSystemState);
    stepController.retreat(stepsState);
  });

  const selectTickets = mobx.action(() => {
    const { ticketStates } = ticketingSystemState;
    seatingState.maximumSelected = ticketStates.reduce(
      (total, state) => total + state.value,
      0
    );
    ticketingSystemController.advanceStep(ticketingSystemState);
    stepController.advance(stepsState);
  });

  const ShowNightWrapper = mobxReact.observer(() => (
    <SelectShow
      showNights={ticketingSystemState.showNights}
      updateShow={updateShow}
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
        retract={retract}
        advance={selectTickets}
      />
    );
  });

  const SelectSeatWrapper = mobxReact.observer(() => (
    <SelectSeats
      selectedSeats={seatingState.selectedSeats.length}
      maxSeats={seatingState.maximumSelected}
      SeatingSelector={<SeatingElement />}
    />
  ));

  mobx.autorun(() => {
    if (userState.selectedShow !== undefined) {
      ticketingSystemController.deleteTickets(ticketingSystemState);
      installTickets(userState.selectedShow).then((tickets: ITicket[]) => {
        ticketingSystemController.addTickets(ticketingSystemState, tickets);
      });
    }
  });

  saveShowNights().then((showNights: ShowNight[]) => {
    ticketingSystemController.setShowNights(ticketingSystemState, showNights);
  });

  const TicketingSystemElement = mobxReact.observer(() => (
    <TicketingSystem
      Steps={<StepsElement />}
      ShowNights={<ShowNightWrapper />}
      BookTickets={<BookTicketsWrapper />}
      SelectSeat={<SelectSeatWrapper />}
      paymentStep={ticketingSystemState.paymentStep}
    />
  ));

  return { TicketingSystemElement, ticketingSystemState };
}
