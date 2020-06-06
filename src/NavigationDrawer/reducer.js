import { createSlice } from '@reduxjs/toolkit';
import { VARIANT_TEMPORARY } from './constants';

export const navigationDrawer = createSlice({
  name: 'navigationDrawer',
  initialState: {
    show: false,
    variant: VARIANT_TEMPORARY,
  },
  reducers: {
    show: (state) => {
      state.show = true;
    },
    hide: (state) => {
      state.show = false;
    },
    toggle: (state) => {
      state.show = !state.show;
    },
    updateVariant: (state, { payload: { variant } }) => {
      state.variant = variant;
    },
  },
});

export const { show, hide, toggle, updateVariant } = navigationDrawer.actions;

export const selectShow = (state) => state.navigationDrawer.show;

export default navigationDrawer.reducer;
