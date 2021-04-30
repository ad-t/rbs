import { StepItemState } from 'src/shared/enums';
import StepsState from './Steps.state';

export default class StepsController {
  advance(state: StepsState) {
    const newProgress = [];

    state.itemsProgress.forEach(() => {
      newProgress.push(StepItemState.COMPLETED);
    });

    newProgress.push(StepItemState.IN_PROGRESS);
    state.itemsProgress = newProgress;
  }

  retreat(state: StepsState) {
    const newProgress = [...state.itemsProgress];
    newProgress.pop();
    newProgress.pop();
    newProgress.push(StepItemState.IN_PROGRESS);
    state.itemsProgress = newProgress;
  }
}
