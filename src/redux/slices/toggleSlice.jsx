import { createSlice } from '@reduxjs/toolkit';

export const toggleSlice = createSlice({
  name: 'toggle',
  initialState: { isToggled: false }, // Initial state
  reducers: {
    toggleState: (state) => {
      state.isToggled = !state.isToggled; // Toggling state
    },
  },
});

// Export the action
export const { toggleState } = toggleSlice.actions;

// Export the reducer
export default toggleSlice.reducer;
