import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('favorites')) || [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action) {
      const camper = action.payload;
      if (!state.items.find(c => c.id === camper.id)) {
        state.items.push(camper);
        localStorage.setItem('favorites', JSON.stringify(state.items));
      }
    },
    removeFavorite(state, action) {
      const id = action.payload;
      state.items = state.items.filter(c => c.id !== id);
      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;

export const selectFavorites = state => state.favorites.items;