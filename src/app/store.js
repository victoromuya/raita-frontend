import { configureStore } from '@reduxjs/toolkit';
import articleReducer from '../features/articleSlice';
import userReducer from '../features/userSlice';


export const store = configureStore({
  reducer: {
    article: articleReducer,
    user: userReducer,
  },
});
