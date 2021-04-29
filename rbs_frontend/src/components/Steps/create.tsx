import React from 'react';
import * as mobxReact from 'mobx-react-lite';

import Steps from './Steps';
import StepState from './Steps.state';

export function createSteps(stepItems: React.ReactNode) {
  const stepsState = new StepState();

  return {
    stepsState,
    StepsElement: mobxReact.observer(() => (
      <Steps stepProgress={stepsState.itemsProgress}>{stepItems}</Steps>
    )),
  };
}
