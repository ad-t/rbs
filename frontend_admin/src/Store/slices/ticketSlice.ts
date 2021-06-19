import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ticket } from 'src/shared/types';

interface TicketState {
  tickets: Ticket[];
}

const initialState: TicketState = {
  tickets: [],
};

export const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setTickets: (state, action: PayloadAction<Ticket[]>) => {
      state.tickets = action.payload;
    },
  },
});

export const { setTickets } = ticketSlice.actions;

export const ticketSliceReducer = ticketSlice.reducer;
