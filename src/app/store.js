import { configureStore } from "@reduxjs/toolkit";
import popularPostsReducer from "../features/PopularPostSlice/PopularPostsSlice";
import subredditReducer from "../features/SubredditSlice/SubredditSlice";
import postReducer from "../features/PostSlice/PostSlice";
import searchReducer from "../features/search/searchSlice";

export const store = configureStore({
  reducer: {
    popularPosts: popularPostsReducer,
    subreddit: subredditReducer,
    post: postReducer,
    search: searchReducer
  },
});
