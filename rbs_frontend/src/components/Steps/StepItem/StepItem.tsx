import React from 'react';
import { StepItemState } from 'src/shared/enums';
import {
  Wrapper,
  NotStartedIcon,
  InProgressIcon,
  CompletedIcon,
  ErroredIcon,
  InProgressName,
  Name,
  CompletedName,
} from './StepItem.styled';

export interface StepItemProps {
  icon: React.ReactNode;
  name: string;
  state?: StepItemState;
}

function getIconComponent(state: StepItemState) {
  if (state === StepItemState.ERROR) return ErroredIcon;
  if (state === StepItemState.COMPLETED) return CompletedIcon;
  if (state === StepItemState.IN_PROGRESS) return InProgressIcon;
  return NotStartedIcon;
}

function getTitleComponent(state: StepItemState) {
  if (state === StepItemState.NOT_STARTED) return Name;
  if (state === StepItemState.COMPLETED) return CompletedName;
  return InProgressName;
}

function Item({
  icon,
  name,
  state = StepItemState.NOT_STARTED,
}: StepItemProps) {
  const Icon = getIconComponent(state);
  const Title = getTitleComponent(state);

  return (
    <Wrapper>
      <Icon>{icon}</Icon>
      <Title>{name}</Title>
    </Wrapper>
  );
}

export default Item;
