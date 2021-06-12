import React from 'react';
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

export interface SquareButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  open: boolean;
  toggleOpen: () => void;
}

export function SquareButton({ onClick, open, toggleOpen }: SquareButtonProps) {
  return (
    <div>
      <PaymentButton onClick={onClick} role="button">
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
          onClose={toggleOpen}
          onOpen={toggleOpen}
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
