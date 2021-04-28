import * as mobx from 'mobx';
import { StepItemState } from 'src/shared/enums';

export default class StepProgress {
  itemsProgress: StepItemState[] = [];

  constructor() {
    mobx.makeAutoObservable(this);
  }
}
