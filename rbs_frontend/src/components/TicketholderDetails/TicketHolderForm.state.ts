import * as mobx from 'mobx';

export class TicketHolderFormState {
  name = '';
  postcode = '';
  phone = '';

  constructor() {
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
