import React from 'react';
import { Story } from '@storybook/react';
import Steps from './Steps';
import StepItem from './StepItem';
import StepController from './Steps.controller';
import { createSteps } from './create';

export default {
  title: 'Component/Steps',
  component: Steps,
};

export const Modifiable: Story = () => {
  const { StepsElement, stepsState } = createSteps([
    <StepItem icon="0" name="Zero" />,
    <StepItem icon="1" name="First" />,
    <StepItem icon="2" name="Second" />,
  ]);

  const controller = new StepController();

  const addProgress = () => {
    controller.advance(stepsState);
  };

  const removeProgress = () => {
    controller.retreat(stepsState);
  };

  return (
    <>
      <StepsElement />
      <button onClick={addProgress}>Advance</button>
      <button onClick={removeProgress}>Retreat</button>
    </>
  );
};
