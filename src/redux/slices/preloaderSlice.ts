import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';

const initialState = {
  showPreloader: false
};

const slice = createSlice({
  name: 'preloader',
  initialState,
  reducers: {
    setPreloader: (state, action) => ({
      ...state,
      showPreloader: action.payload
    })
  }
});

// Reducer
export default slice.reducer;

// Actions
export const {
  setPreloader,
} = slice.actions;

export const runPreloader = (show: boolean) => {
  dispatch(setPreloader(show))
}
