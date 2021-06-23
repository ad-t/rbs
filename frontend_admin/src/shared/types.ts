export interface Show {
  id: number;
  time: string;
  production: number;
  totalSeats: number;
  reservedSeats: number;
  orders: number[];
  ticketTypes: number[];
}

export interface Ticket {
  id: string;
  name: string;
  phone: string;
  postcode: string;
  checkInTime: string;
  order: string;
  ticketType: string;
  seat: string;
}
