import * as mobx from 'mobx';

export default class TicketState {
  id: string;
  cost: number;
  value: number;
  name: string;

  constructor(id: string, initialTickets: number, cost: number, name = '') {
    this.id = id;
    this.value = initialTickets;
    this.cost = cost;
    this.name = name;
    mobx.makeAutoObservable(this);
  }
}
