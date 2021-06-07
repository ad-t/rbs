export interface Production {
  id: number;
  title: string;
  subtitle: string;
  year: number;
  description: string;
}

export interface ShowNight {
  id: number;
  time: string;
  reservedSeats: number;
  totalSeats: number;
}

/** Details about the owner of the particular ticket */
export interface TickerOwnerDetails {
  typeId: number; // The type of ticket, e.g. General Ticket on Wednesday
  name: string;
  postcode: string;
  phone: string;
  seatNum: string;
}

export interface Ticket {
  id: number;
  price: number;
  description: string;
  minPurchaseAmount: number;
}

export interface DiscountInfo {
  name: string;
  code: string;
  message: string;
  minGroupSize: number;
  showId: number;
  waiveHandlingFee: boolean;
  partOfGroup: boolean;
}
