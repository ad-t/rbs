import React from 'react';
import { Story } from '@storybook/react';
import { StepItemState } from 'src/shared/enums';
import { FiCloudLightning } from 'react-icons/fi';
import StepItem, { StepItemProps } from './StepItem';

export default {
  title: 'Component/StepItem',
  component: StepItem,
};

const Template: Story<StepItemProps> = (args) => <StepItem {...args} />;

export const Everything = () => (
  <>
    <StepItem icon={<FiCloudLightning />} name="Weather Forecast" />
    <StepItem
      icon={<FiCloudLightning />}
      name="Weather Forecast"
      state={StepItemState.IN_PROGRESS}
    />
    <StepItem
      icon={<FiCloudLightning />}
      name="Weather Forecast"
      state={StepItemState.COMPLETED}
    />
    <StepItem
      icon={<FiCloudLightning />}
      name="Weather Forecast"
      state={StepItemState.ERROR}
    />
  </>
);

export const Default = Template.bind({});
Default.args = {
  icon: 0,
  name: 'Purchase Title',
  state: StepItemState.NOT_STARTED,
};

export const InProgress = Template.bind({});
InProgress.args = {
  icon: 0,
  name: 'Purchase Title',
  state: StepItemState.IN_PROGRESS,
};

export const Completed = Template.bind({});
Completed.args = {
  icon: 0,
  name: 'Purchase Title',
  state: StepItemState.COMPLETED,
};

export const Errored = Template.bind({});
Errored.args = {
  icon: 0,
  name: 'Purchase Title',
  state: StepItemState.ERROR,
};
