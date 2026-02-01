import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL =
  'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers';

/* ---------- API ---------- */

export const fetchCampers = createAsyncThunk(
  'campers/fetchCampers',
  async ({ page = 1, filters }, thunkAPI) => {
    try {
      const params = {
        page,
        limit: 4,
      };

      if (filters.location) {
        params.location = filters.location;
      }

      if (filters.form) {
        params.form = filters.form;
      }

      Object.entries(filters.features).forEach(
  ([key, value]) => {
    if (!value) return;

    // Automatic -> transmission
    if (key === 'automatic') {
      params.transmission = 'automatic';
      return;
    }

    // Other features
    params[key] = true;
  }
);

      const res = await axios.get(BASE_URL, { params });

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

/* ---------- SLICE ---------- */

const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    items: [],
    page: 1,
    isLoading: false,
    error: null,
    hasMore: true,
  },

  reducers: {
    resetCampers(state) {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchCampers.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isLoading = false;

      const data = action.payload?.items || [];
      const total = action.payload?.total || 0;

      if (state.items.length + data.length >= total) {
        state.hasMore = false;
      }

        state.items.push(...data);
        state.page += 1;
    })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCampers } = campersSlice.actions;

export default campersSlice.reducer;