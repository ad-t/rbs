import * as mobx from 'mobx';
import { StepItemState } from 'src/shared/enums';

export default class StepProgress {
  itemsProgress: StepItemState[] = [StepItemState.IN_PROGRESS];

  constructor() {
    mobx.makeAutoObservable(this);
  }
}
