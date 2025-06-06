// src/features/campers/campersSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers';

// Thunk для отримання списку кемперів за фільтром/пагінацією
export const fetchCampers = createAsyncThunk(
  'campers/fetchCampers',
  async ({ page = 1, limit = 10, filters = '' }, thunkAPI) => {
    try {
      // Якщо потрібно враховувати фільтр за назвою:
      const response = await axios.get(BASE_URL, {
        params: {
          page,
          limit,
          search: filters, // mockAPI може використовувати ?search=...
        },
      });
      return {
        items: response.data,
        total: Number(response.headers['x-total-count'] || response.data.length),
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk для отримання одного кемпера по ID
export const fetchCamperById = createAsyncThunk(
  'campers/fetchCamperById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    items: [],
    currentCamper: null,
    loading: false,
    error: null,
    hasMore: true,
    filters: {
      location: '',
      type: '',
      amenities: [],
    },
  },
  reducers: {
    // Якщо потрібно ще синхронні дії - додавайте сюди
    setFilters(state, action) {
      state.filters = action.payload;
    },
    resetCampers(state) {
      state.items = [];
      state.hasMore = true;
    },
  },
  extraReducers: builder => {
    builder
      // === fetchCampers ===
      .addCase(fetchCampers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        const newCampers = Array.isArray(action.payload) ? action.payload : [];
        if (newCampers.length === 0) {
          state.hasMore = false;
        }
        state.items = [...state.items, ...newCampers];
        state.loading = false;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // === fetchCamperById ===
      .addCase(fetchCamperById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.currentCamper = action.payload; // action.payload — об’єкт з даними одного кемпера
        state.loading = false;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCampers, setPage, setFilters } = campersSlice.actions;
export default campersSlice.reducer;

// Селектори
export const selectCampers = state => state.campers.items;
export const selectCurrentCamper = state => state.campers.current;
export const selectLoading = state => state.campers.loading;
export const selectError = state => state.campers.error;
export const selectHasMore = state => state.campers.hasMore;
export const selectFilters = state => state.campers.filters;

// (Опціонально, селектор пагінації)
export const selectPage = state => state.campers.page;
export const selectLimit = state => state.campers.limit;
export const selectTotal = state => state.campers.total;