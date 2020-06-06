import { configureStore } from '@reduxjs/toolkit';
import navigationDrawerReducer from './NavigationDrawer/reducer';
import moviesReducer from './Movies/reducer';

const store = configureStore({
  reducer: {
    navigationDrawer: navigationDrawerReducer,
    movies: moviesReducer,
  },
});

export default store;
