import * as React from 'react';
import dayjs from 'dayjs';
import { Button, Table } from 'semantic-ui-react';
import { Ticket } from 'src/shared/types';

interface TableProps {
  tickets: Ticket[];
}

export function DisplayTable({ tickets }: TableProps) {
  function checkIn(ticketId: string) {
    // TODO: use proper ID
    // const showRes = await fetch(
    //   `${process.env.REACT_APP_API_URL}/admin/tickets/${ticketId}/check-in`,
    //   { method: 'POST', credentials: 'include' }
    // );
    // if (showRes.status === 200) {
    //   if (this.state.inputMethod === 'order_id') {
    //     await this.fetchOrder(this.state.submittedSearch);
    //   } else {
    //     await this.fetchTickets(ticketId);
    //   }
    // }
  }

  function reverseCheckIn(ticketId: string) {
    // TODO: use proper ID
    // const showRes = await fetch(
    //   `${process.env.REACT_APP_API_URL}/admin/tickets/${ticketId}/check-in-reverse`,
    //   { method: 'POST', credentials: 'include' }
    // );
    // if (showRes.status === 200) {
    //   if (this.state.inputMethod === 'order_id') {
    //     await this.fetchOrder(this.state.submittedSearch);
    //   } else {
    //     await this.fetchTickets(ticketId);
    //   }
    // }
  }

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Ticket ID</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Seat num</Table.HeaderCell>
          <Table.HeaderCell>Checked in?</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tickets.map((a) => (
          <Table.Row key={a.id}>
            <Table.Cell>{a.id}</Table.Cell>
            <Table.Cell>{a.name}</Table.Cell>
            <Table.Cell>{a.seat ? 'a.seat.seatNum' : '???'}</Table.Cell>
            <Table.Cell>
              {a.checkInTime
                ? dayjs(a.checkInTime).format('ddd DD MMM YYYY HH:mm')
                : 'no'}
            </Table.Cell>
            <Table.Cell>
              {a.checkInTime ? (
                <Button onClick={() => reverseCheckIn(a.id)}>
                  Reverse Check In
                </Button>
              ) : (
                <Button primary onClick={() => checkIn(a.id)}>
                  Check In
                </Button>
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
