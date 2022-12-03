import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./reducers/auth";
import commentsSlice from "./reducers/comment";
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    comments: commentsSlice.reducer,
  },
});

export default store;
