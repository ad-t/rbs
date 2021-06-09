import React, { useState } from 'react';
import {
  Button,
  Header,
  Icon,
  Grid,
  Modal,
  Transition,
} from 'semantic-ui-react';
import { CgSquare } from 'react-icons/cg';
import { PaymentButton } from './SquareButton.styles';

export interface SquareProp {
  onSquareApprove: () => void;
  setupSquare(): Promise<string | null>;
}

export default function SquareButton({
  onSquareApprove,
  setupSquare,
}: SquareProp) {
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
      win.location.replace(url);
      const timer = setInterval(() => {
        if (win.closed) {
          clearInterval(timer);
          // TODO: can we track on frontend if paid before getting backend
          // to check?
          onSquareApprove();
        }
      }, 1000);
    }
  }

  return (
    <div>
      <PaymentButton onClick={onClick}>
        Pay with Square <CgSquare />
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
          size="small"
        >
          <Header icon>
            <Icon name="check" />
            Pay with Square
          </Header>
          <Modal.Content>
            <Grid>
              <Grid.Row centered>
                <p style={{ fontFamily: 'Arial' }}>
                  Don’t see the secure Square checkout page? We’ll help you
                  re-launch the window to complete your purchase
                </p>
              </Grid.Row>
            </Grid>
          </Modal.Content>
          <Modal.Actions>
            <Grid centered>
              <Button color="blue" inverted onClick={onClick}>
                <Icon name="refresh" /> Relaunch Square
              </Button>
            </Grid>
          </Modal.Actions>
        </Modal>
      </Transition>
    </div>
  );
}
