import * as mobxReact from 'mobx-react-lite';
import * as React from 'react';
import {
  CheckboxProps,
  DropdownProps,
  InputOnChangeData,
} from 'semantic-ui-react';
import { installTicketsFromShow } from 'src/Api/installTicketsFromShow';
import { useAppSelector } from 'src/Store/hooks';
import { LoadStates, SearchByType } from 'src/shared/enums';
import { AllBookings } from './AllBookings';
import { AllBookingsState } from './AllBookings.state';
import { Search } from './Search';
import { ShowNightSelector } from './ShowNightSelector';

export function createAllBookings() {
  const allBookingsState = new AllBookingsState();

  const onRadioChange = (
    _: React.FormEvent<HTMLInputElement>,
    { value }: CheckboxProps
  ) => {
    allBookingsState.setSearchType(
      (value as SearchByType) ?? SearchByType.NAME
    );
  };

  const onSearchChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    { value }: InputOnChangeData
  ) => {
    allBookingsState.setSearch(value);
  };

  const onShowNightChange = (
    _: React.SyntheticEvent<HTMLElement, Event>,
    { value }: DropdownProps
  ) => {
    allBookingsState.setShowId(parseInt(value as string));
    allBookingsState.setLoadingState(LoadStates.LOADING);

    installTicketsFromShow(value?.toString() || '').then((tickets) => {
      allBookingsState.setTickets(tickets);
      allBookingsState.setLoadingState(LoadStates.LOADED);
    });
  };

  const SearchElement = mobxReact.observer(() => (
    <Search
      search={allBookingsState.search}
      searchType={allBookingsState.searchType}
      onRadioChange={onRadioChange}
      onSearchChange={onSearchChange}
    />
  ));

  const ShowNightSelectorElement = mobxReact.observer(() => {
    const shows = useAppSelector((state) => state.shows.shows);

    return (
      <ShowNightSelector
        shows={shows}
        showId={allBookingsState.showId}
        onChange={onShowNightChange}
      />
    );
  });

  return {
    AllBookingElement: mobxReact.observer(() => (
      <AllBookings
        showId={allBookingsState.showId}
        tickets={allBookingsState.tickets}
        loadingState={allBookingsState.loadingState}
        SearchElement={<SearchElement />}
        ShowNightSelectorElement={<ShowNightSelectorElement />}
      />
    )),
  };
}
