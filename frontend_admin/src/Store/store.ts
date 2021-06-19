import { configureStore } from '@reduxjs/toolkit';
import { showSliceReducer } from 'src/Store/slices/showSlice';
import { ticketSliceReducer } from './slices/ticketSlice';

export const reduxStore = configureStore({
  reducer: {
    shows: showSliceReducer,
    tickets: ticketSliceReducer,
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
