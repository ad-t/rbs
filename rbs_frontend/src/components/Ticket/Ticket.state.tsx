import * as mobx from 'mobx';

export default class TicketState {
  cost: number;
  value: number;

  constructor(initialTickets: number, cost: number) {
    mobx.makeAutoObservable(this);
    this.value = initialTickets;
    this.cost = cost;
  }
}
