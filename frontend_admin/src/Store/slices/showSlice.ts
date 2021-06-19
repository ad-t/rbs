import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Show } from 'src/shared/types';

interface ShowState {
  shows: Show[];
}

const initialState: ShowState = {
  shows: [],
};

export const showSlice = createSlice({
  name: 'shows',
  initialState,
  reducers: {
    setShows: (state, action: PayloadAction<Show[]>) => {
      state.shows = action.payload;
    },
  },
});

export const { setShows } = showSlice.actions;

export const showSliceReducer = showSlice.reducer;
