import { configureStore } from '@reduxjs/toolkit';
import toggleReducer from './slices/toggleSlice'; // Import the reducer

export const store = configureStore({
  reducer: {
    toggle: toggleReducer,
  },
});
