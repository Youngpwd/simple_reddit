import { configureStore } from "@reduxjs/toolkit";
import popularPostsReducer from "../features/PopularPostSlice/PopularPostsSlice";

export const store = configureStore({
  reducer: {
    popularPosts: popularPostsReducer,
  },
});
