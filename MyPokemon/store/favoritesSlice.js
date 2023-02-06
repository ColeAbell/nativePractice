import {createSlice} from '@reduxjs/toolkit';

const initialFav = {favorites: []};
export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: initialFav,
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
      console.log('i added');
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(item => item !== action.payload);
    },
  },
});

export const favoriteActions = favoritesSlice.actions;
