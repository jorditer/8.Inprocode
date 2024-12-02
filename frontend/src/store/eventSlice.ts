// src/store/eventSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '../types/event';

// Define the state interface
interface EventState {
  items: Event[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

// Define initial state with type
const initialState: EventState = {
  items: [],
  status: 'idle',
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state: EventState, action: PayloadAction<Event[]>) => {
      state.items = action.payload;
      state.status = 'succeeded';
    }
  }
});

export const { setEvents } = eventSlice.actions;
export default eventSlice.reducer;