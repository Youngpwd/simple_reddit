import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  currentSort: "hot",
  status: "idle",
  error: null,
};

export const fetchPopularPosts = createAsyncThunk(
  "popularPost/fetchPopularPosts",
  async (sortType) => {
    const result = await axios.get(
      `https://www.reddit.com/r/popular.json?sort=${sortType}`
    );
    return result.data.data.children.map((post) => post.data);
  }
);

export const popularPostSlice = createSlice({
  name: "popularPost",
  initialState,
  reducers: {
    setCurrentSort: (state, action) => {
      state.currentSort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPopularPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPopularPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentSort } = popularPostSlice.actions;

export default popularPostSlice.reducer;
