import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react-lite';
import { SquareButtonState } from './SquareButton.state';
import { SquareButton, SquareButtonProps } from './SquareButton';

type Props = Omit<SquareButtonProps, 'open' | 'toggleOpen'>;

export function createSquareButton() {
  const squareButtonState = new SquareButtonState();
  const toggleOpen = mobx.action(() => {
    squareButtonState.open = !squareButtonState.open;
  });

  const SquareButtonElement = mobxReact.observer((props: Props) => (
    <SquareButton
      {...props}
      open={squareButtonState.open}
      toggleOpen={toggleOpen}
    />
  ));

  return {
    SquareButtonElement,
    squareButtonState,
  };
}
