export interface IProductionResponse {
  uid: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface IShowsResponse {
  uid: string;
  title: string;
}

export interface ITicketType {
  uid: string;
  name: string;
  price: number;
}
