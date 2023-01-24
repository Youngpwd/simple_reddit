import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  currentSort: "hot",
  status: "idle",
  error: null,
};

const popularPostsSlice = createSlice({
  name: "popularPosts",
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

export const fetchPopularPosts = createAsyncThunk(
  "popularPosts/fetchPopularPosts",
  async (sortType) => {
    // await new Promise((resolve) => setTimeout(resolve, 2000)); //remove when done with testing loading
    const result = await axios.get(
      `https://www.reddit.com/r/popular/${sortType}.json?limit=100`
    );
    // console.log(result);
    return result.data.data.children.map((post) => post.data);
  }
);

export const { setCurrentSort } = popularPostsSlice.actions;

export const selectCurrentSort = (state) => state.popularPosts.currentSort;
export const selectPosts = (state) => state.popularPosts.posts;
export const selectLoadingStatus = (state) =>
  state.popularPosts.status === "loading";
export const selectError = (state) => state.popularPosts.error;

export default popularPostsSlice.reducer;
