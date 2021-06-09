import React from 'react';
import styled from 'styled-components';
import { StepItemState } from 'src/shared/enums';
import { IoCheckmarkSharp } from 'react-icons/io5';
import * as variables from 'src/shared/css.variables';

const Wrapper = styled.div`
  display: flex;
  border-bottom: 0.125rem solid ${variables.grey300};
  margin-bottom: 0.5rem;
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

    const newProps: { state: StepItemState; icon?: React.ReactNode } = {
      state:
        index < stepProgress.length
          ? stepProgress[index]
          : StepItemState.NOT_STARTED,
    };

    if (
      index < stepProgress.length &&
      stepProgress[index] === StepItemState.COMPLETED
    ) {
      newProps['icon'] = <IoCheckmarkSharp />;
    }

    return React.cloneElement(child as JSX.Element, newProps);
  });
}

export default function Steps({ children, stepProgress }: StepsProps) {
  const assignedChildren = stepProgress
    ? matchStateToChild(children, stepProgress)
    : children;

  return <Wrapper>{assignedChildren}</Wrapper>;
}
