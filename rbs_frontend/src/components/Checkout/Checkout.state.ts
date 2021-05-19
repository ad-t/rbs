import * as mobx from 'mobx';

export default class CheckoutState {
  orderID = "";
  name = "";
  email = "";
  phone = "";
  hasClickedPayment = false;
  
  constructor() {
    mobx.makeAutoObservable(this);
  }
  
  updateOrderID(id: string) {
    this.orderID = id;
  }
};
