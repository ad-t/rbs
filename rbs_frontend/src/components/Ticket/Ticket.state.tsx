import * as mobx from 'mobx';

export default class TicketState {
  value: number;

  constructor(initialTickets: number) {
    mobx.makeAutoObservable(this);
    this.value = initialTickets;
  }
}
