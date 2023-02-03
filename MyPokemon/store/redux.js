const {configureStore} = require('@reduxjs/toolkit');
const {favoritesSlice} = require('./favoritesSlice');

const favoritesReducer = favoritesSlice.reducer;
export const store = configureStore({
  reducer: favoritesReducer,
});
