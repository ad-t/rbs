/*
 * This file will handle information relating to the show
 */
import React from 'react';
import { Header, Icon, Step } from 'semantic-ui-react';

import BookTickets from './BookTickets';
import SelectShow from './SelectShow';

interface Props {};
interface State {
  currentId: number;
  selectedShow: number;
};

export default class TicketingSystem extends React.Component<Props, State> {
  // This may be changed during testing. Default values should be:
  // currentId: 0, selectedShow: -1
  state = { currentId: 1, selectedShow: 1 };

  updateShow = (selectedShow: number) => {
    this.setState({ currentId: 1, selectedShow });
  } 

  render() {
    const { currentId, selectedShow } = this.state;
    let displayElm = <SelectShow updateShow={this.updateShow} />;

    if (currentId === 1) displayElm = <BookTickets selectedShow={selectedShow}/>;

    return (
      <React.Fragment>
        <Header as='h2' style={{margin: 0, padding: '1em 0.5em 0em'}}>
          <Icon name='shop'/>
          <Header.Content>
            Watch The Show
            <Header.Subheader>Place your order for a seat to watch Med Revue 2020</Header.Subheader>
          </Header.Content>
        </Header>
        <Step.Group size='mini' widths={4} unstackable>
          <Step active={currentId === 0} completed={currentId > 0}>
            <Icon name='bullhorn'/>
            <Step.Content>
              <Step.Title>Show Night</Step.Title>
            </Step.Content>
          </Step>
          <Step active={currentId === 1} completed={currentId > 1}>
            <Icon name='ticket' />
            <Step.Content>
              <Step.Title>Tickets</Step.Title>
            </Step.Content>
          </Step>
          <Step active={currentId === 2} completed={currentId > 2}>
            <Icon name='payment' />
            <Step.Content>
              <Step.Title>Billing</Step.Title>
            </Step.Content>
          </Step>
          <Step active={currentId === 3} completed={currentId > 3}>
            <Icon name='info' />
            <Step.Content>
              <Step.Title>Confirm Order</Step.Title>
            </Step.Content>
          </Step>
        </Step.Group>
        {displayElm}
      </React.Fragment>
    );
  }
};
