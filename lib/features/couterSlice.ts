// counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state for the counter
interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0, // Initial counter value
};

// Create a slice
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1; // Increment the counter value by 1
    },
    decrement: (state) => {
      state.value -= 1; // Decrement the counter value by 1
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.value = action.payload; // Set counter value to a specific number
    },
  },
});

// Export actions for dispatching
export const { increment, decrement, setCount } = counterSlice.actions;

// Export the reducer to be used in the store
export default counterSlice.reducer;
