import { ShowNight } from 'src/shared/types';

const showNights: ShowNight[] = [
  {
    id: 0,
    time: '2021-06-16T18:00:00+1000',
    reservedSeats: 10,
    totalSeats: 400,
  },
  {
    id: 1,
    time: '2021-06-17T18:00:00+1000',
    reservedSeats: 15,
    totalSeats: 400,
  },
  {
    id: 2,
    time: '2021-06-18T18:00:00+1000',
    reservedSeats: 200,
    totalSeats: 400,
  },
];

export async function saveShowNights() {
  return new Promise<ShowNight[]>((resolve) => {
    setTimeout(() => {
      resolve(showNights);
    }, 1000); // Simulates delay in milliseconds. Change as needed
  });
}
