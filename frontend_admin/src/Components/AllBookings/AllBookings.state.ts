import * as mobx from 'mobx';
import { LoadStates } from 'src/shared/enums';
import { Ticket } from 'src/shared/types';

export class AllBookingsState {
  tickets: Ticket[] = [];
  loadingState: LoadStates = LoadStates.NOT_LOADED;

  constructor() {
    mobx.makeAutoObservable(this);
  }
}
