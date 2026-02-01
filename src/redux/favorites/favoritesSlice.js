import { createSlice } from '@reduxjs/toolkit';

/* ---------- helpers ---------- */

const loadFromStorage = () => {
  try {
    const data = localStorage.getItem('favorites');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToStorage = data => {
  localStorage.setItem(
    'favorites',
    JSON.stringify(data)
  );
};

/* ---------- slice ---------- */

const favoritesSlice = createSlice({
  name: 'favorites',

  initialState: {
    items: loadFromStorage(),
  },

  reducers: {
    addFavorite(state, action) {
      state.items.push(action.payload);

      saveToStorage(state.items);
    },

    removeFavorite(state, action) {
      state.items = state.items.filter(
        item => item.id !== action.payload
      );

      saveToStorage(state.items);
    },
  },
});

export const {
  addFavorite,
  removeFavorite,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;