/*
 * The interfaces for the tickets. This will be used by the TicketContext which is defined in the
 * tickets.tsx file under context.
 */
export interface ITicket {
  uid: number,
  cost: number,
  description: string,
  quantity: number
};

export interface ITicketManager {
  addTicket(ticket: ITicket): void
  getTickets(): Array<ITicket>,
  modifyQuantity(uid: number, amount: number): void
  removeTicket(uid: number): void
  removeAllTickets(): void
};
