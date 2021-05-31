/*
 * This component will return an invoice that shows what tickets were purchased from the user.
 */
import React from 'react';
import {
  Divider,
  Header,
  Icon,
  Grid,
  List,
  Popup,
  Message,
} from 'semantic-ui-react';

import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';

import TicketNoControl from '../TicketNoControl';
import TicketholderDetails from '../TicketholderDetails';
import SquareButton from '../SquareButton';

// Import our interface
import { ITicket, ITicketDetails } from 'src/types/tickets';
import { IDiscount } from 'src/types/discount';

import CheckoutState from './Checkout.state';
import { PaymentBtnGroup, TicketsList, TicketPrice } from './Checkout.styles';

export interface CheckoutProps {
  selectedShow: number;
  tickets: ITicket[];
  ticketDetails: ITicketDetails[];
  discount: IDiscount | null;
  updatePayment(details: any): void;
  state: CheckoutState;

  checkoutForm: JSX.Element;
}

function Checkout(props: CheckoutProps) {
  const { state, checkoutForm } = props;

  const checkValidDetails = () => {
    // TODO: improve validation
    let valid = (state.name && state.email && state.phone) !== '';

    for (const details of props.ticketDetails) {
      if (!details.name || !details.postcode) {
        valid = false;
      }
    }

    return valid;
  };

  const reserveSeats = async () => {
    const valid = checkValidDetails();
    if (!valid) {
      alert('Please fill out all ticketholder details.');
      throw new Error('invalid details');
    }

    const seats = [];
    for (const ticket of props.tickets) {
      const details = props.ticketDetails.filter((x) => x.typeId === ticket.id);
      if (details.length) {
        seats.push({
          details,
          ticketType: ticket.id,
        });
      }
    }

    const result = await fetch(
      `${process.env.REACT_APP_API_URL}/shows/${props.selectedShow}/seats`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: state.name,
          email: state.email,
          phone: state.phone,
          voucherCode: props.discount?.code,
          seats,
        }),
      }
    );

    if (!result.ok) {
      const text = await result.text();
      alert(result.status + ': ' + text);
      throw new Error(result.status + ': ' + text);
    }

    return result;
  };

  const getOrderId = async () => {
    let id = state.orderID;
    let orderRes;

    try {
      orderRes = await reserveSeats();
    } catch (e) {
      console.error(e);
      return null;
    }

    const data = await orderRes.json();
    id = data.id;
    state.updateOrderID(id);
    return id;
  };

  const setupSquare = async () => {
    const id = await getOrderId();
    // TODO: better handle missing ID
    if (!id) return null;

    const setupRes = await fetch(
      `${process.env.REACT_APP_API_URL}/orders/${id}/square-setup`,
      {
        method: 'POST',
      }
    );
    const setup = await setupRes.json();
    return setup.url;
  };

  /* FIXME: should be configurable from server side */
  const handlingFee = (price: number) => {
    return props.discount?.waiveHandlingFee ? 0 : 2.19;
  };

  const onSquareApprove = async () => {
    const verify = await fetch(
      `${process.env.REACT_APP_API_URL}/orders/${state.orderID}/square-verify-payment`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      }
    );

    if (verify.status === 200) {
      props.updatePayment({ orderID: state.orderID, email: state.email });
    } else {
      const text = await verify.text();
      // FIXME: use better UI
      alert(verify.status + ': ' + text);
    }
  };

  // const handleChange = mobxAction((e: any, { name, value }: any) => {
  //   state[name] = value;
  // });

  // const onChange = mobxAction((index: number, name: string, value: string) => {
  //   props.ticketDetails[index][name] = value;
  // });

  const { tickets, ticketDetails } = props;
  const { name, email, phone } = state;
  const ticketElms: Array<JSX.Element> = [];
  let totalPrice = 0;

  for (let i = 0; i < tickets.length; ++i) {
    const ticket: ITicket = tickets[i];
    if (!ticket.quantity) continue;
    ticketElms.push(
      <TicketNoControl
        key={i}
        index={i}
        cost={ticket.price}
        description={ticket.description}
        quantity={ticket.quantity}
      />
    );
    totalPrice += ticket.quantity * ticket.price;
  }

  const detailsElms: Array<JSX.Element> = [];
  for (let i = 0; i < ticketDetails.length; ++i) {
    const currDetails = ticketDetails[i];
    const ticketType = tickets.find((t) => currDetails.typeId === t.id);
    const description = ticketType?.description || '';

    const copyIndex = i;

    detailsElms.push(
      <TicketholderDetails
        index={i}
        details={currDetails}
        description={description}
        showErrors={state.hasClickedPayment}
        // onChange={(name, value) => onChange(copyIndex, name, value)}
        onChange={() => {
          //
        }}
      />
    );
  }

  const isValidPurchaser =
    name.trim() && /^\S+@\S+$/.test(email) && phone.trim();
  const formsAreValid =
    isValidPurchaser &&
    ticketDetails.every((a) => !!a.name.trim() && /^\d{4}$/.test(a.postcode));

  return (
    <React.Fragment>
      <div style={{ margin: '0 1rem' }}>
        <Header as="h1">Checkout</Header>
        <Grid columns={2} stackable reversed="mobile">
          <Grid.Column>
            {checkoutForm}

            {detailsElms}
          </Grid.Column>
          <Grid.Column>
            <Header as="h4">Policies</Header>
            <p>
              By purchasing a ticket to UNSW Med Revue 2021, you agree to the
              following:
            </p>
            <ul>
              <li>
                Mask wearing within the theatre is currently compulsory at all
                times, except for momentary eating or drinking or if you have a
                relevant medical condition.
              </li>
              <li>
                Do <strong>not</strong> attend if you have symptoms of COVID-19,
                or you are required to self-isolate or quarantine.
              </li>
              <li>
                You will follow the{' '}
                <a
                  href="https://hospitality.unsw.edu.au/storage/app/media/COVIDSafe/COVIDSafe%20Conditions%20of%20Entry.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  UNSW Hospitality conditions of entry
                </a>{' '}
                at all times.
              </li>
              <li>
                <strong>Strobe lighting</strong> may be used in this
                performance. Please contact us if you have any concerns.
              </li>
              <li>
                Arc tickets may require proof of Arc membership upon entry.
              </li>
              <li>
                Ticket exchanges may be available (subject to capacity). Please
                contact us ASAP if you need to reschedule.
              </li>
              <li>
                Tickets will be refunded in full if the event is cancelled, or
                you are required to self-isolate due to COVID-19 regulations.
                Any other refunds will be at our sole discretion (or as required
                under Australian Consumer Law).
              </li>
              <li>
                For further information, contact us on{' '}
                <a href="https://www.facebook.com/MedRevue">Facebook</a> or
                email ticketing@medrevue.org.
              </li>
            </ul>
            <TicketsList>{ticketElms}</TicketsList>
            <TicketPrice>
              <List>
                <List.Item>Subtotal: ${totalPrice.toFixed(2)}</List.Item>
                <List.Item>
                  <Popup
                    trigger={
                      <Icon
                        circular
                        name="info"
                        size="tiny"
                        color="blue"
                        inverted
                      />
                    }
                    content="This covers our ticket processing, technology and support costs. This fee is only once per transaction, no matter how many tickets are purchased."
                    size="small"
                  />{' '}
                  Handling Fee: ${handlingFee(totalPrice).toFixed(2)}
                </List.Item>
                <List.Item>
                  Total Cost: $
                  {(totalPrice + handlingFee(totalPrice)).toFixed(2)}
                </List.Item>
              </List>
            </TicketPrice>
          </Grid.Column>
        </Grid>
      </div>
      <PaymentBtnGroup>
        <Grid stackable columns={4} centered>
          <Grid.Column>
            <Grid columns={1}>
              <Grid.Column>
                <SquareButton
                  setupSquare={async () => {
                    runInAction(() => {
                      state.hasClickedPayment = true;
                    });
                    if (!formsAreValid) return null;
                    return await setupSquare();
                  }}
                />
              </Grid.Column>
              <Grid.Column textAlign="center" style={{ paddingTop: '2px' }}>
                <p>All major credit/debit cards accepted</p>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid>
      </PaymentBtnGroup>
    </React.Fragment>
  );
}

export default observer(Checkout);
