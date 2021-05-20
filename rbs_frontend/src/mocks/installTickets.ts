import { ITicket } from 'src/types/tickets';

const Tickets: ITicket[] = [
  {
    id: 0,
    price: 10.0,
    description: 'Arc Member',
    minPurchaseAmount: 0,
  },
  {
    id: 1,
    price: 15.0,
    description: 'General Admission',
    minPurchaseAmount: 0,
  },
  {
    id: 2,
    price: 12.0,
    description: 'General Admission Group',
    minPurchaseAmount: 4,
  },
];

export async function installTickets() {
  return new Promise<ITicket[]>((resolve) => {
    setTimeout(() => {
      resolve(Tickets);
    }, 1000); // Simulates delay in milliseconds. Change as needed
  });
}
