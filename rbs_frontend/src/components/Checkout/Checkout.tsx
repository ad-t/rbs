/*
 * This component will return an invoice that shows what tickets were purchased from the user.
 */
import React from 'react';
import { Header, Icon, Grid, List, Popup } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { IDiscount } from 'src/types/discount';
import { PaymentBtnGroup, TicketsList, TicketPrice } from './Checkout.styles';

export interface CheckoutProps {
  discount: IDiscount | null;
  totalPrice: number;

  checkoutForm: React.ReactNode;
  ticketDetailsForms: React.ReactNode;
  checkoutElement: React.ReactNode;
}

function Checkout({
  discount,
  totalPrice,
  checkoutForm,
  ticketDetailsForms,
  checkoutElement,
}: CheckoutProps) {
  /* FIXME: should be configurable from server side */
  const handlingFee = (price: number) => {
    return discount?.waiveHandlingFee ? 0 : 2.19;
  };

  return (
    <React.Fragment>
      <div style={{ margin: '0 1rem' }}>
        <Header as="h1">Checkout</Header>
        <Grid columns={2} stackable reversed="mobile">
          <Grid.Column>
            {checkoutForm}
            {ticketDetailsForms}
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
            <TicketsList>{ticketDetailsForms}</TicketsList>
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
              <Grid.Column>{checkoutElement}</Grid.Column>
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
