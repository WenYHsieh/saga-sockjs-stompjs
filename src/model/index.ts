import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './data';

export const slice = createSlice({
  name: `app`,
  initialState,
  reducers: {
    FETCH_GET_MESSAGE: () => {},
    FETCH_CONNECTION: () => {},
    FETCH_CHANNEL_CONNECTION: (state, action) => {
      return {
        ...state,
        payload: action.payload,
      };
    },
    SET_MESSAGE: (state, action) => {
      return {
        ...state,
        message: action.payload,
      };
    },
    FETCH_SEND_MESSAGE: (state, action) => {
      return { ...state, payload: action.payload };
    },
    SET_STATUS: (state, action) => {
      return {
        ...state,
        status: action.payload,
      };
    },
  },
});

export const {
  FETCH_GET_MESSAGE,
  FETCH_CONNECTION,
  FETCH_CHANNEL_CONNECTION,
  SET_MESSAGE,
  FETCH_SEND_MESSAGE,
  SET_STATUS,
} = slice.actions;

export default slice.reducer;
