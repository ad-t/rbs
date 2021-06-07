import * as mobx from 'mobx';

export class TicketHolderFormState {
  name = '';
  postcode = '';
  phone = '';

  constructor(name = '', postcode = '', phone = '') {
    this.name = name;
    this.postcode = postcode;
    this.phone = phone;
    mobx.makeAutoObservable(this);
  }

  updateName(name: string) {
    this.name = name;
  }

  updatePostcode(postcode: string) {
    this.postcode = postcode;
  }

  updatePhone(phone: string) {
    this.phone = phone;
  }
}
