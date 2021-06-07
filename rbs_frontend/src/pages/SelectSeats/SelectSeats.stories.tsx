import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import * as React from 'react';
import mobxReact from 'mobx-react-lite';
import { createSeating } from 'src/components/Seating/create';
import SelectSeats from './SelectSeats';
import 'semantic-ui-css/semantic.min.css';

export default {
  title: 'Page/SelectSeats',
};

export const Default: Story = () => {
  const { SeatingElement, seatingState } = createSeating(5);

  const Element = mobxReact.observer(() => (
    <SelectSeats
      selectedSeats={seatingState.selectedSeats.length}
      maxSeats={5}
      SeatingSelector={<SeatingElement />}
      retract={action('Retract')}
      advance={action('Advance')}
    />
  ));

  return <Element />;
};
