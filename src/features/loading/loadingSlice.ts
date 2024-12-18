import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeRequests: 0,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startRequest: (state) => {
      state.activeRequests += 1;
    },
    endRequest: (state) => {
      state.activeRequests -= 1;
    },
  },
});

export const { startRequest, endRequest } = loadingSlice.actions;
export default loadingSlice.reducer;
