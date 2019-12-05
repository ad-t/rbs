/*
 * This file will handle information relating to the show
 */
import React from 'react';
import { Header, Icon, Step } from 'semantic-ui-react';

import BookTickets from './BookTickets';

interface Props {};
interface State {};

export default class TicketingSystem extends React.Component<Props, State> {
  render() {
    return (
      <React.Fragment>
        <Header as='h2' style={{margin: '1em 0.5em 0em'}}>
          <Icon name='shop'/>
          <Header.Content>
            Buy Tickets
            <Header.Subheader>Buy your tickets for Med Revue 2020</Header.Subheader>
          </Header.Content>
        </Header>
        <Step.Group size='mini' widths={3} unstackable>
          <Step active>
            <Icon name='ticket' />
            <Step.Content>
              <Step.Title>Tickets</Step.Title>
            </Step.Content>
          </Step>
          <Step>
            <Icon name='payment' />
            <Step.Content>
              <Step.Title>Billing</Step.Title>
            </Step.Content>
          </Step>
          <Step>
            <Icon name='info' />
            <Step.Content>
              <Step.Title>Confirm Order</Step.Title>
            </Step.Content>
          </Step>
        </Step.Group>
        <BookTickets />
      </React.Fragment>
    );
  }
};
