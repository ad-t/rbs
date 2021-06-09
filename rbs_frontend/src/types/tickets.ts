/*
 * The interfaces for the tickets. This will be used by the TicketContext which is defined in the
 * tickets.tsx file under context.
 */
export interface ITicket {
  id: number;
  price: number;
  description: string;
  minPurchaseAmount: number;
  quantity?: number;
}

export interface ITicketDetails {
  typeId: number;
  name: string;
  postcode: string;
  phone: string;
  seatNum: string;
}
