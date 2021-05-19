import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Button, Divider, Form, Header, Icon, Input, Grid, Modal, Image, Transition } from 'semantic-ui-react';

import {
  PaymentButton,
} from './SquareButton.styles';

interface Prop {
  setupSquare(): Promise<string | null>;
}

export default function SquareButton({ setupSquare }: Props) {
  const [open, setOpen] = useState(false);

  async function onClick() {
    // NOTE: hack to work around Safari refusing to open popups that are
    // called asynchronously: https://stackoverflow.com/q/20696041/2074608
    const win = window.open(undefined, 'square-pay', 'toolbar=no');
    const url = await setupSquare();
    if (!url) {
      win?.close();
      return;
    }

    /* NOTE: hack to detect window closed without CORS */
    if (win) {
      setOpen(true);
      win.location = url;
      const timer = setInterval(() => {
        if (win.closed) {
          clearInterval(timer);
          // TODO: can we track on frontend if paid before getting backend
          // to check?
          this.onSquareApprove();
        }
      }, 1000);
    }
  }

  return (
    <div>
    <PaymentButton onClick={onClick}>
      Pay with Square <img src='/square-logo.svg'/>
    </PaymentButton>
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
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
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
          <Button color='red' inverted onClick={() => setOpen(false)}>
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
