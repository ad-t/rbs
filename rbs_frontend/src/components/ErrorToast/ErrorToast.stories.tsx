import React from 'react';
import { Story } from '@storybook/react';
import ErrorToast from './ErrorToast';
import { ToastError } from 'src/shared/errors';

export default {
  title: 'Component/ErrorToast',
  component: ErrorToast,
};

export const Default: Story = () => {
  return (
    <ErrorToast>
      <button
        onClick={() => {
          throw new ToastError('I screwed up');
        }}
      >
        Failed
      </button>
    </ErrorToast>
  );
};
