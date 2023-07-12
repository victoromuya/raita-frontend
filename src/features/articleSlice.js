import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  value: 0,
  status: 'idle',
  selectedArticle : null,
  sendMessageIsOpen : false
};

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    selectArticle: (state, action) => {
      state.selectedArticle = action.payload
    },

    openSendMessage: (state) => {
      state.sendMessageIsOpen = true;
    },
    closeSendMessage: (state) => {
      state.sendMessageIsOpen = false;
    },
   },
});

export const selectOpenArticle = (state) => state.article.selectedArticle;
export const { selectArticle, openSendMessage, closeSendMessage } = articleSlice.actions;
export const selectSendMessageIsOpen = (state) => state.mail.sendMessageIsOpen;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.


export default articleSlice.reducer;
