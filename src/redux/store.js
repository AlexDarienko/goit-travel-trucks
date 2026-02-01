import { configureStore } from '@reduxjs/toolkit';

import campersReducer from './campers/campersSlice';
import filtersReducer from './filters/filtersSlice';

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    filters: filtersReducer,
  },
});