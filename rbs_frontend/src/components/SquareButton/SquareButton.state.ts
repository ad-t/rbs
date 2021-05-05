import * as mobx from 'mobx';

export default class SquareButtonState {
  open = false;

  constructor() {
    mobx.makeAutoObservable(this);
  }
}
