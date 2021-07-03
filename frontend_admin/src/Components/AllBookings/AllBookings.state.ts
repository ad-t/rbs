import * as mobx from 'mobx';
import { LoadStates, SearchByType } from 'src/shared/enums';
import { Ticket } from 'src/shared/types';

export class AllBookingsState {
  tickets: Ticket[] = [];
  loadingState: LoadStates = LoadStates.NOT_LOADED;
  search: string = '';
  searchType: SearchByType = SearchByType.NAME;
  showId: number | null = null;

  constructor() {
    mobx.makeAutoObservable(this);
  }

  setLoadingState(loadingState: LoadStates) {
    this.loadingState = loadingState;
  }

  setTickets(tickets: Ticket[]) {
    this.tickets = tickets;
  }

  setSearch(search: string) {
    this.search = search;
  }

  setSearchType(searchType: SearchByType) {
    this.searchType = searchType;
  }

  setShowId(showId: number) {
    this.showId = showId;
  }
}
