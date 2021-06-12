import * as mobx from 'mobx';

export class TicketHolderFormState {
  name = '';
  postcode = '';
  phone = '';
  isTriggered = false;

  constructor(name = '', postcode = '', phone = '') {
    this.name = name;
    this.postcode = postcode;
    this.phone = phone;
    mobx.makeAutoObservable(this);
  }

  updateName(name: string) {
    this.name = name;
  }

  isNameValid() {
    return this.name.trim().length > 0;
  }

  updatePostcode(postcode: string) {
    this.postcode = postcode;
  }

  isPostcodeValid() {
    const isNumRegex = /^\d+$/;
    return this.postcode.trim().length > 0 && isNumRegex.test(this.postcode);
  }

  updatePhone(phone: string) {
    this.phone = phone;
  }

  validate() {
    this.isTriggered = true;
    return this.isNameValid() && this.isPostcodeValid();
  }
}
