import { StepItemState } from 'src/shared/enums';
import StepsController from '../Steps.controller';
import StepsState from '../Steps.state';

describe('Testing steps controller', () => {
  it('Should advance progression by changing previous steps to COMPLETE and set tail to IN_PROGRESS', () => {
    const state = new StepsState();
    const controller = new StepsController();

    expect(state.itemsProgress[0]).toBe(StepItemState.IN_PROGRESS);
    controller.advance(state);
    expect(state.itemsProgress[0]).toBe(StepItemState.COMPLETED);
    expect(state.itemsProgress[1]).toBe(StepItemState.IN_PROGRESS);
  });

  it('Should retreat progression by removing the tail and changing the previous state to IN_PROGRESS', () => {
    const state = new StepsState();
    const controller = new StepsController();

    // Manually set state
    state.itemsProgress = [
      StepItemState.COMPLETED,
      StepItemState.COMPLETED,
      StepItemState.COMPLETED,
      StepItemState.IN_PROGRESS,
    ];
    controller.retreat(state);
    expect(state.itemsProgress[0]).toBe(StepItemState.COMPLETED);
    expect(state.itemsProgress[1]).toBe(StepItemState.COMPLETED);
    expect(state.itemsProgress[2]).toBe(StepItemState.IN_PROGRESS);
  });
});
