import React from 'react';
import { Story } from '@storybook/react';
import { StepItemState } from 'src/shared/enums';
import Steps from './Steps';
import StepItem from './StepItem';
import { createSteps } from './create';

export default {
  title: 'Component/Steps',
  component: Steps,
};

export const Default: Story = () => {
  const { StepsElement } = createSteps([
    <StepItem icon="0" name="Zero" />,
    <StepItem icon="1" name="First" />,
    <StepItem icon="2" name="Second" />,
  ]);
  return <StepsElement />;
};

export const Modifiable: Story = () => {
  const { StepsElement, stepsState } = createSteps([
    <StepItem icon="0" name="Zero" />,
    <StepItem icon="1" name="First" />,
    <StepItem icon="2" name="Second" />,
  ]);

  const addProgress = () => {
    stepsState.itemsProgress = [
      ...stepsState.itemsProgress,
      StepItemState.IN_PROGRESS,
    ];
  };

  const removeProgress = () => {
    if (stepsState.itemsProgress.length) {
      stepsState.itemsProgress.pop();
      stepsState.itemsProgress = [...stepsState.itemsProgress];
    }
  };

  return (
    <>
      <StepsElement />
      <button onClick={addProgress}>Advance</button>
      <button onClick={removeProgress}>Retreat</button>
    </>
  );
};
