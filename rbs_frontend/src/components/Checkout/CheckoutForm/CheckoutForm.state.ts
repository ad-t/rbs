import * as mobx from 'mobx';

export class CheckoutFormState {
  name = '';
  email = '';
  phone = '';
  hasClickedPayment = false;

  constructor() {
    mobx.makeAutoObservable(this);
  }

  updateName(name: string) {
    this.name = name;
  }

  isNameValid() {
    return this.name.trim().length > 0;
  }

  updateEmail(email: string) {
    this.email = email;
  }

  isEmailValid() {
    const isEmailRegex = /^\S+@\S+$/;
    return this.email.trim().length > 0 && isEmailRegex.test(this.email);
  }

  updatePhone(phone: string) {
    this.phone = phone;
  }

  isPhoneValid() {
    const isNumRegex = /^\d+$/;
    return this.phone.trim().length > 0 && isNumRegex.test(this.phone);
  }

  validate() {
    this.hasClickedPayment = true;
    return this.isNameValid() && this.isEmailValid() && this.isPhoneValid();
  }
}
