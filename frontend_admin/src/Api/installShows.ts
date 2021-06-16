import { Show } from 'src/shared/types';

const show: Show[] = [
  {
    id: 0,
    production: 1,
    time: '2021-12-16T18:00:00+1000',
    totalSeats: 100,
    reservedSeats: 50,
    orders: [],
    ticketTypes: [],
  },
  {
    id: 1,
    production: 1,
    time: '2021-12-17T18:00:00+1000',
    totalSeats: 100,
    reservedSeats: 50,
    orders: [],
    ticketTypes: [],
  },
  {
    id: 2,
    production: 1,
    time: '2021-12-18T18:00:00+1000',
    totalSeats: 100,
    reservedSeats: 50,
    orders: [],
    ticketTypes: [],
  },
];

export function installShows() {
  return new Promise<Show[]>((resolve) => {
    setTimeout(() => resolve(show), 1000);
  });
}
