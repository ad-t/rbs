import React from 'react';
import styled from 'styled-components';
import { StepItemState } from 'src/shared/enums';

const Wrapper = styled.div`
  display: flex;
`;

interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  stepProgress?: StepItemState[];
}

/**
 * Go through the list of step items state and assign them to a child element base on the index
 */
function matchStateToChild(
  children: React.ReactNode,
  stepProgress: StepItemState[]
) {
  return React.Children.map(children, (child, index) => {
    if (!child) return null;
    return React.cloneElement(child as JSX.Element, {
      state:
        index < stepProgress.length
          ? stepProgress[index]
          : StepItemState.NOT_STARTED,
    });
  });
}

export default function Steps({ children, stepProgress }: StepsProps) {
  const assignedChildren = stepProgress
    ? matchStateToChild(children, stepProgress)
    : children;

  return <Wrapper>{assignedChildren}</Wrapper>;
}
