import * as React from 'react';
import QrReader from 'react-qr-reader';
import { Loader, Message, Segment } from 'semantic-ui-react';
import { installTickets } from 'src/Api/installTickets';
import { DisplayTable } from 'src/Components/CheckIn/Table/Table';
import { useAppDispatch, useAppSelector } from 'src/Store/hooks';
import { setTickets } from 'src/Store/slices/ticketSlice';
import { LoadStates } from 'src/shared/types';

export function QRCodeMethod() {
  const [loadState, setLoadState] = React.useState<LoadStates>(
    LoadStates.NOT_LOADED
  );
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const dispatch = useAppDispatch();
  const tickets = useAppSelector((state) => state.tickets.tickets);

  function handleScan(data: string | null) {
    if (
      data &&
      /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(
        data
      )
    ) {
      setLoadState(LoadStates.LOADING);
      setSearchTerm(data);

      installTickets(data).then((tickets) => {
        setLoadState(LoadStates.LOADED);
        dispatch(setTickets(tickets));
      });
    }
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
      <QrReader
        delay={300}
        onError={() => {
          // TODO: Add tests
        }}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      {results}
    </>
  );
}
