import { createSlice } from '@reduxjs/toolkit';


const initialState = {

  user : null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },

    logout: (state) => {
      state.user = null;
    },
   },
});

export const selectUser = (state) => state.user.user;
export const { login, logout } = userSlice.actions;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.


export default userSlice.reducer;
