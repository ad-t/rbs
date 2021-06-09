import React from 'react';
import { action } from '@storybook/addon-actions';
import { createSquareButton } from './create';

export default {
  title: 'Component/SquareButton',
};

export const Default = () => {
  const { SquareButtonElement } = createSquareButton();
  return <SquareButtonElement onClick={action('Clicked')} />;
};
