import { Ticket } from 'src/shared/types';

const tickets: Ticket[] = [
  {
    id: '5ba060d7-4a37-4581-9461-958c396324af',
    name: 'General Admission',
    phone: '000',
    postcode: '1234',
    checkInTime: '2021-12-16T18:00:00+1000',
    order: '',
    ticketType: '',
    seat: '',
  },
  {
    id: '4c414df4-a599-4649-9137-2b6e3b3e0942',
    name: 'General Admission Group Ticket',
    phone: '000',
    postcode: '1234',
    checkInTime: '2021-12-16T18:00:00+1000',
    order: '',
    ticketType: '',
    seat: '',
  },
  {
    id: '42b346bd-cf45-4c12-aab0-be8da55bb5d9',
    name: 'Arc Ticket',
    phone: '000',
    postcode: '1234',
    checkInTime: '2021-12-16T18:00:00+1000',
    order: '',
    ticketType: '',
    seat: '',
  },
];

export function installTicketsFromShow(showId: string) {
  return new Promise<Ticket[]>((resolve) => {
    setTimeout(() => resolve(tickets), 1000);
  });
}
