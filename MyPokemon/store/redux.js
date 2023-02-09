import { authenticationReducer } from './authenticationSlice';

const { configureStore } = require('@reduxjs/toolkit');
const { favoritesSlice } = require('./favoritesSlice');




const favoritesReducer = favoritesSlice.reducer;
export const store = configureStore({
  reducer: {
    favoritesInfo: favoritesReducer,
    authentication: authenticationReducer,
  }
});
