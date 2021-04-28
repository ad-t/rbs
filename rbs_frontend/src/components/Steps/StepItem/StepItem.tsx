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
} from './StepItem.styled';

export interface StepItemProps {
  icon: React.ReactNode;
  name: string;
  state?: StepItemState;
}

function getIconElement(state: StepItemState) {
  if (state === StepItemState.ERROR) return ErroredIcon;
  if (state === StepItemState.COMPLETED) return CompletedIcon;
  if (state === StepItemState.IN_PROGRESS) return InProgressIcon;
  return NotStartedIcon;
}

function getTitleElement(state: StepItemState) {
  if (state === StepItemState.NOT_STARTED) return Name;
  return InProgressName;
}

function Item({
  icon,
  name,
  state = StepItemState.NOT_STARTED,
}: StepItemProps) {
  const Icon = getIconElement(state);
  const Title = getTitleElement(state);

  return (
    <Wrapper>
      <Icon>{icon}</Icon>
      <Title>{name}</Title>
    </Wrapper>
  );
}

export default Item;
