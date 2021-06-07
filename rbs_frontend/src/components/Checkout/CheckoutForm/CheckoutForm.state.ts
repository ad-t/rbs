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

  updateEmail(email: string) {
    this.email = email;
  }

  updatePhone(phone: string) {
    this.phone = phone;
  }

  validate() {
    this.hasClickedPayment = true;
    return (
      this.name.length > 0 && this.email.length > 0 && this.phone.length > 0
    );
  }
}
