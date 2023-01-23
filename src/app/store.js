import { configureStore } from "@reduxjs/toolkit";
import popularPostsReducer from "../features/PopularPostSlice/PopularPostsSlice";
import subredditReducer from "../features/SubredditSlice/SubredditSlice";

export const store = configureStore({
  reducer: {
    popularPosts: popularPostsReducer,
    subreddit: subredditReducer,
  },
});
