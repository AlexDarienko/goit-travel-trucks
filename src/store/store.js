import { configureStore } from '@reduxjs/toolkit';
import campersReducer from '../features/campers/campersSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';

const store = configureStore({
  reducer: {
    campers: campersReducer,
    favorites: favoritesReducer,
  },
});

export default store;