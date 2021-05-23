import * as mobxReact from 'mobx-react-lite';
import { Icon } from 'semantic-ui-react';
import { createTicket } from 'src/components/Ticket/create';
import { createSteps } from 'src/components/Steps/create';
import StepItem from 'src/components/Steps/StepItem';
import { TicketingSystemState } from 'src/components/TicketingSystem/TicketingSystem.state';
import { saveShowNights } from 'src/mocks/installShows';
import { installTickets } from 'src/mocks/installTickets';
import { ITicket } from 'src/types/tickets';
import { ShowNight } from 'src/shared/types';
import { installBookTickets } from './installBookTickets';
import { installSelectSeat } from './installSelectSeat';
import { installShowNights } from './installShowNights';
import { TicketingSystem } from './TicketingSystem';

const iconStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0,
};

export function createTicketingSystem() {
  const ticketingSystemState = new TicketingSystemState();
  const { SelectSeatWrapper } = installSelectSeat();
  const BookTicketsWrapper = installBookTickets(ticketingSystemState);
  const ShowNightWrapper = installShowNights(ticketingSystemState);

  const { StepsElement } = createSteps([
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

  saveShowNights().then((showNights: ShowNight[]) => {
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

  const TicketingSystemElement = mobxReact.observer(() => (
    <TicketingSystem
      Steps={<StepsElement />}
      BookTickets={<BookTicketsWrapper />}
      SelectSeat={<SelectSeatWrapper />}
      ShowNights={<ShowNightWrapper />}
      paymentStep={ticketingSystemState.paymentStep}
    />
  ));

  return { TicketingSystemElement, ticketingSystemState };
}
