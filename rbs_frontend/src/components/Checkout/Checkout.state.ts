import * as mobx from 'mobx';
import { CheckoutFormState } from 'src/components/Checkout/CheckoutForm/CheckoutForm.state';
import { TicketHolderFormState } from 'src/components/TicketholderDetails/TicketHolderForm.state';
import { TickerOwnerDetails } from 'src/shared/types';
export class CheckoutState {
  hasClickedPayment = false;
  checkoutFormState: CheckoutFormState | null = null;
  ticketDetailStates: TicketHolderFormState[] = [];

  constructor() {
    mobx.makeAutoObservable(this);
  }

  addTicketDetailsState(state: TicketHolderFormState) {
    this.ticketDetailStates = [...this.ticketDetailStates, state];
  }

  addTicketDetails(ticketDetails: TickerOwnerDetails) {
    this.ticketDetailStates = [
      ...this.ticketDetailStates,
      new TicketHolderFormState(
        ticketDetails.name,
        ticketDetails.postcode,
        ticketDetails.phone
      ),
    ];
  }

  setTicketDetails(ticketDetails: TickerOwnerDetails[]) {
    const ticketDetailsStates = ticketDetails.map(
      (details) =>
        new TicketHolderFormState(details.name, details.postcode, details.phone)
    );
    this.ticketDetailStates = ticketDetailsStates;
  }

  setCheckoutFormState(state: CheckoutFormState) {
    this.checkoutFormState = state;
  }
}
