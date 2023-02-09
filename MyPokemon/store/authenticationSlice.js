import {createSlice} from '@reduxjs/toolkit';

const initialAuth = {token: null, isAuthenticated: false};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: initialAuth,
  reducers: {
    logIn: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    logOut: state => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const authenticationActions = authenticationSlice.actions;
export const authenticationReducer = authenticationSlice.reducer;
