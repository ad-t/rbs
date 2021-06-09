import * as React from 'react';
import { ToastContainer } from 'react-toastify';

interface AppProps {
  TicketingSystemElement: React.ReactNode;
}

export function App({ TicketingSystemElement }: AppProps) {
  return (
    <>
      {TicketingSystemElement}
      <ToastContainer />
    </>
  );
}
