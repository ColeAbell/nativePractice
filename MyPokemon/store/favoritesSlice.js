import {createSlice} from '@reduxjs/toolkit';

const initialState = {favorites: []};
export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: initialState,
  reducers: {
    addFavorite(state, action) {
      state.favorites.push(action.payload);
    },
    removeFavorite(state, action) {
      state.favorites = state.favorites.filter(item => item !== action.payload);
    },
  },
});

export const favoriteActions = favoritesSlice.actions;
