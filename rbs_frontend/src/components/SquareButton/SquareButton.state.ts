import * as mobx from 'mobx';

export class SquareButtonState {
  open = false;

  constructor() {
    mobx.makeAutoObservable(this);
  }

  openModal() {
    this.open = true;
  }

  closeModal() {
    this.open = false;
  }
}
