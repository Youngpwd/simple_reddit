import { configureStore } from "@reduxjs/toolkit";
import popularPostReducer from "../features/popular-post/PopularPostSlice";

export const store = configureStore({
  reducer: {
    popularPost: popularPostReducer,
  },
});
