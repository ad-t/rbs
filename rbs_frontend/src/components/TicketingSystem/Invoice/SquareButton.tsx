import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Divider, Form, Header, Icon, Input, Grid, Modal, Image, Transition } from 'semantic-ui-react';

interface Prop {
  setupSquare(): Promise<string | null>;
}

interface State {
  open: boolean;
}

export default class SquareButton extends React.Component<Prop, State> {
  state = {
    open: false
  }

  setOpen(val: boolean) {
    this.setState({ open: val });
  }

  render() {
    const { setupSquare } = this.props;
    const { open } = this.state;

    return (
      <div>
      <Button primary size='big' style={{height: "45px", padding: "0 12px 2px 12px"}} fluid onClick={async () => {(await setupSquare()) && this.setOpen(true)}}>
        Pay with Square <i className="icon"><Image spaced src='/square-logo.svg'/></i>
      </Button>
      <Transition
        animation="fade"
        duration={1000}
        unmountOnHide={true}
        visible={open}
      >
        <Modal
          basic
          closeOnEscape={false}
          closeOnDimmerClick={false}
          closeIcon={true}
          onClose={() => this.setOpen(false)}
          onOpen={() => this.setOpen(true)}
          open={true}
          size='small'
        >
          <Header icon>
            <Icon name='check' />
            Pay with Square
          </Header>
          <Modal.Content>
            <Grid>
            <Grid.Row centered>
            <p style={{fontFamily:'Arial'}}>
              Don’t see the secure Square checkout page? We’ll help you re-launch the window to complete your purchase
            </p>
            </Grid.Row>
            </Grid>
          </Modal.Content>
          <Modal.Actions>
            <Grid centered>
            {/*
            <Button color='red' inverted onClick={() => this.setOpen(false)}>
              <Icon name='remove' /> Try another method
            </Button>
            */}
            <Button color='blue' inverted onClick={() => setupSquare()}>
              <Icon name='refresh' /> Relaunch Square
            </Button>
            </Grid>
          </Modal.Actions>
        </Modal>
      </Transition>
      </div>
    );
  }
}
