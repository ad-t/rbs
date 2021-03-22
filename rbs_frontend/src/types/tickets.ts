/*
 * The interfaces for the tickets. This will be used by the TicketContext which is defined in the
 * tickets.tsx file under context.
 */
export interface ITicket {
  id: number,
  price: number,
  description: string,
  minPurchaseAmount: number,
  quantity: number,
  details: ITicketDetails[]
};

export interface ITicketDetails {
  name: string;
  postcode: string;
  phone: string;
}

// This is just to create a ticket manager context. For more information, consult the context file
export interface ITicketManager {
  addTicket(ticket: ITicket): Promise<boolean>,
  getTickets(): Array<ITicket>,
  modifyQuantity(uid: number, amount: number): Promise<boolean>,
  removeTicket(uid: number): Promise<boolean>,
  removeAllTickets(): Promise<boolean>
};
