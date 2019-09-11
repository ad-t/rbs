/*
 * The interfaces for the tickets. This will be used by the TicketContext which is defined in the
 * tickets.tsx file under context.
 */

 // For a ticket interface. The uid will correspond to the ticket uid in the backend. The uid is
 // what really is used to tell the backend what tickets are bought. Cost and description are just
 // variables to remember their attributes and have no real affect on the backend.
export interface ITicket {
  uid: number,
  cost: number,
  description: string,
  quantity: number
};

// This is just to create a ticket manager context. For more information, consult the context file
export interface ITicketManager {
  addTicket(ticket: ITicket): void
  getTickets(): Array<ITicket>,
  modifyQuantity(uid: number, amount: number): void
  removeTicket(uid: number): void
  removeAllTickets(): void
};
