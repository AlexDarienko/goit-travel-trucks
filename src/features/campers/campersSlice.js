// src/features/campers/campersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io';

const mapForm = {
  Van: 'panelTruck',
  'Fully Integrated': 'fullyIntegrated',
  Alcove: 'alcove',
};

export const fetchCampers = createAsyncThunk(
  'campers/fetch',
  /**
   * payload: { page=1, limit=6, reset=false, filters={} }
   */
  async ({ page = 1, limit = 6, reset = false, filters = {} }, { rejectWithValue }) => {
    try {
      // На бекенд шлемо лише пагінацію + form (тип кузова), решта фільтрується на клієнті
      const params = { page, limit };
      if (filters.type) params.form = mapForm[filters.type];

      const res = await axios.get(`${API}/campers`, { params });

      // ------- нормалізація відповіді у масив --------
      let incoming = res.data;
      if (!Array.isArray(incoming)) {
        if (incoming?.items && Array.isArray(incoming.items)) {
          incoming = incoming.items;
        } else if (incoming?.data && Array.isArray(incoming.data)) {
          incoming = incoming.data;
        } else if (incoming && typeof incoming === 'object') {
          // інколи повертається об’єкт keyed by id — перетворимо в масив об’єктів
          incoming = Object.values(incoming).filter((v) => v && typeof v === 'object');
        } else {
          incoming = [];
        }
      }
      // -----------------------------------------------

      // Клієнтська фільтрація
      const q = (filters.location || '').trim().toLowerCase();

      const filtered = incoming.filter((item) => {
        const locStr = (item.location || '').toString().toLowerCase();

        const byLoc = !q || locStr.includes(q);

        const hasAC = !filters.AC || !!(item.AC ?? item.details?.AC);
        const hasKitchen = !filters.kitchen || !!(item.kitchen ?? item.details?.kitchen);
        const hasTV = !filters.TV || !!(item.TV ?? item.details?.TV);
        const hasBathroom = !filters.bathroom || !!(item.bathroom ?? item.details?.bathroom);

        return byLoc && hasAC && hasKitchen && hasTV && hasBathroom;
      });

      // hasMore: коректно за total, або fallback по розміру сторінки
      const total = Number(res.headers['x-total-count'] ?? 0);
      const hasMore = total ? page * limit < total : filtered.length === limit;

      return { items: filtered, reset, hasMore };
    } catch (err) {
      return rejectWithValue(err.message || 'Request failed');
    }
  }
);

const campersSlice = createSlice({
  name: 'campers',
  initialState: { items: [], loading: false, error: null, hasMore: true },
  reducers: {
    resetList(state) {
      state.items = [];
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        const { items, reset, hasMore } = action.payload;
        state.loading = false;
        state.hasMore = hasMore;
        state.items = reset ? items : [...state.items, ...items];
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Request failed';
      });
  },
});

export const { resetList } = campersSlice.actions;

// СЕЛЕКТОРИ (із захистом від не-масиву)
export const selectCampers = (s) =>
  Array.isArray(s.campers.items) ? s.campers.items : [];
export const selectLoading = (s) => s.campers.loading;
export const selectError = (s) => s.campers.error;
export const selectHasMore = (s) => s.campers.hasMore;

export default campersSlice.reducer;