import { configureStore } from '@reduxjs/toolkit';

import campersReducer from './campers/campersSlice';
import filtersReducer from './filters/filtersSlice';
import camperDetailsReducer from './camperDetails/camperDetailsSlice';

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    filters: filtersReducer,
    camperDetails: camperDetailsReducer,
  },
});