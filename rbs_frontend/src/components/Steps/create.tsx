import React from 'react';
import * as mobxReact from 'mobx-react-lite';

import Steps from './Steps';
import StepController from './Steps.controller';
import StepState from './Steps.state';

export function createSteps(stepItems: React.ReactNode) {
  const stepsState = new StepState();
  const stepController = new StepController();

  return {
    stepsState,
    stepController,
    StepsElement: mobxReact.observer(() => (
      <Steps stepProgress={stepsState.itemsProgress}>{stepItems}</Steps>
    )),
  };
}
