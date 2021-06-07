import { ITicket } from 'src/types/tickets';

const Shows: Record<number, ITicket[]> = {
  0: [
    {
      id: 0,
      price: 5.0,
      description: 'Arc Member',
      minPurchaseAmount: 0,
    },
    {
      id: 2,
      price: 10.0,
      description: 'Arc Member Group',
      minPurchaseAmount: 5,
    },
    {
      id: 3,
      price: 15.0,
      description: 'General Admission',
      minPurchaseAmount: 0,
    },
    {
      id: 4,
      price: 12.0,
      description: 'General Admission Group',
      minPurchaseAmount: 4,
    },
  ],
  1: [
    {
      id: 5,
      price: 10.0,
      description: 'Arc Member',
      minPurchaseAmount: 0,
    },
    {
      id: 6,
      price: 15.0,
      description: 'General Admission',
      minPurchaseAmount: 0,
    },
    {
      id: 7,
      price: 12.0,
      description: 'General Admission Group',
      minPurchaseAmount: 4,
    },
  ],
  2: [
    {
      id: 8,
      price: 15.0,
      description: 'Arc Member',
      minPurchaseAmount: 0,
    },
    {
      id: 9,
      price: 25.0,
      description: 'General Admission',
      minPurchaseAmount: 0,
    },
  ],
};

export async function installTickets(showId: number) {
  return new Promise<ITicket[]>((resolve) => {
    setTimeout(() => {
      resolve(Shows[showId]);
    }, 1000); // Simulates delay in milliseconds. Change as needed
  });
}
