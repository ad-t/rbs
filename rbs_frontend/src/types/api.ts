import { AxiosInstance, AxiosPromise } from 'axios';

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

export interface IDataFetcher {
  axiosInstance: AxiosInstance;
  getProduction: (name: string) => Promise<{ data: IProductionResponse }>;
  getShows: (name: string) => Promise<{ data: IShowsResponse[] }>;
  getTicketTypes: (showUID: string) => Promise<{ data: ITicketType[] }>;
}
