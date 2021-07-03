import React from 'react';
import { Container, Header, Message, Loader } from 'semantic-ui-react';
import styled from 'styled-components';
import { LoadStates } from 'src/shared/enums';
import { Ticket } from 'src/shared/types';

const LoaderWrapper = styled.div`
  padding: 1rem;
`;

interface AllBookingsProps {
  showId: number | null;
  tickets: Ticket[];
  loadingState: LoadStates;
  ShowNightSelectorElement: JSX.Element;
  SearchElement: JSX.Element;
}

export class AllBookings extends React.Component<AllBookingsProps> {
  async checkIn(ticketId: string) {
    // TODO: use proper ID
    const showRes = await fetch(
      `${process.env.REACT_APP_API_URL}/admin/tickets/${ticketId}/check-in`,
      { method: 'POST', credentials: 'include' }
    );

    if (showRes.status === 200 && this.props.showId) {
      await this.fetchTickets(this.props.showId);
    }
  }

  async reverseCheckIn(ticketId: string) {
    // TODO: use proper ID
    const showRes = await fetch(
      `${process.env.REACT_APP_API_URL}/admin/tickets/${ticketId}/check-in-reverse`,
      { method: 'POST', credentials: 'include' }
    );

    if (showRes.status === 200 && this.props.showId) {
      await this.fetchTickets(this.props.showId);
    }
  }

  async fetchTickets(showId: any) {
    const showRes = await fetch(
      `${process.env.REACT_APP_API_URL}/admin/shows/${showId}/tickets`,
      { credentials: 'include' }
    );

    if (showRes.ok) {
      const data = await showRes.json();
      this.setState({ data: data });
    }
  }

  render() {
    const {
      loadingState,
      tickets,
      showId,
      SearchElement,
      ShowNightSelectorElement,
    } = this.props;

    const filteredData = tickets;

    let tableDisplay = <Message info>Please select a show night</Message>;

    if (
      filteredData &&
      filteredData.length &&
      loadingState === LoadStates.LOADED
    ) {
      tableDisplay = <div>Placeholder</div>;
    } else if (showId !== null && loadingState === LoadStates.LOADED) {
      tableDisplay = <Message error>No tickets found for this night</Message>;
    } else if (loadingState === LoadStates.LOADING) {
      tableDisplay = (
        <LoaderWrapper>
          <Loader active inline="centered" size="medium">
            Loading tickets
          </Loader>
        </LoaderWrapper>
      );
    }

    return (
      <Container style={{ marginTop: '7rem' }}>
        <Header as="h1">All Bookings</Header>
        {ShowNightSelectorElement}
        {SearchElement}
        {tableDisplay}
      </Container>
    );
  }
}
