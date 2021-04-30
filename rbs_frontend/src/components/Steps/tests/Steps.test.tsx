import { render } from '@testing-library/react';
import { StepItemState } from 'src/shared/enums';
import * as variables from 'src/shared/css.variables';
import Steps from '../Steps';
import StepItem from '../StepItem';

describe('Testing <Steps />', () => {
  it('Should render out 3 steps', () => {
    const { getByText } = render(
      <Steps>
        <StepItem icon="0" name="FIRST STEP" />
        <StepItem icon="1" name="SECOND STEP" />
        <StepItem icon="2" name="THIRD STEP" />
      </Steps>
    );

    getByText('FIRST STEP');
    getByText('SECOND STEP');
    getByText('THIRD STEP');
  });

  it('Should render out correct colours based on the provided state', () => {
    const { getByText } = render(
      <Steps
        stepProgress={[StepItemState.COMPLETED, StepItemState.IN_PROGRESS]}
      >
        <StepItem icon="0" name="FIRST STEP" />
        <StepItem icon="1" name="SECOND STEP" />
        <StepItem icon="2" name="THIRD STEP" />
      </Steps>
    );

    const firstStep = getByText('0');
    const secondStep = getByText('1');
    const thirdStep = getByText('2');

    expect(firstStep).toHaveStyleRule('background', variables.green500);
    expect(secondStep).toHaveStyleRule('background', variables.primary900);
    expect(thirdStep).toHaveStyleRule('background', variables.grey400);
  });
});
