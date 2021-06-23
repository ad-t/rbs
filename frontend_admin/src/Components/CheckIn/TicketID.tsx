import * as React from 'react';
import {
  Form,
  Loader,
  Message,
  Segment,
  InputOnChangeData,
} from 'semantic-ui-react';
import { installTickets } from 'src/Api/installTickets';
import { DisplayTable } from 'src/Components/CheckIn/Table/Table';
import { useAppDispatch, useAppSelector } from 'src/Store/hooks';
import { setTickets } from 'src/Store/slices/ticketSlice';
import { LoadStates } from 'src/shared/enums';

export function TicketIDMethod() {
  const [loadState, setLoadState] = React.useState<LoadStates>(
    LoadStates.NOT_LOADED
  );
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const dispatch = useAppDispatch();
  const tickets = useAppSelector((state) => state.tickets.tickets);

  function retrieveTicketById() {
    setLoadState(LoadStates.LOADING);

    installTickets(searchTerm).then((tickets) => {
      setLoadState(LoadStates.LOADED);
      dispatch(setTickets(tickets));
    });
  }

  function onChange(
    _: React.ChangeEvent<HTMLInputElement>,
    { value }: InputOnChangeData
  ) {
    setSearchTerm(value);
  }

  let results = <Segment>Enter a ticket to get started</Segment>;

  if (loadState === LoadStates.LOADED && tickets && tickets.length) {
    results = <DisplayTable tickets={tickets} />;
  } else if (loadState === LoadStates.LOADED) {
    results = <Message color="red">Ticket {searchTerm} not found</Message>;
  } else if (loadState === LoadStates.LOADING) {
    results = (
      <Loader active inline="centered" size="medium">
        Loading tickets
      </Loader>
    );
  }

  return (
    <>
      <Form onSubmit={() => retrieveTicketById()}>
        <Form.Input
          icon={{
            name: 'search',
            circular: true,
            link: true,
            onClick: () => retrieveTicketById(),
          }}
          value={searchTerm}
          placeholder="Ticket ID..."
          onChange={onChange}
        />
      </Form>
      {results}
    </>
  );
}
