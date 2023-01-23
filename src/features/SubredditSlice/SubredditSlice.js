import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  subredditName: "",
  posts: [],
  currentSort: "hot",
  status: "idle",
  error: null,
};

const subredditSlice = createSlice({
  name: "subreddit",
  initialState,
  reducers: {
    setCurrentSort: (state, action) => {
      state.currentSort = action.payload;
    },
    setSubredditName: (state, action) => {
      state.subredditName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubreddit.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubreddit.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchSubreddit.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const fetchSubreddit = createAsyncThunk(
  "subreddit/fetchSubreddit",
  async (sortType, subreddit) => {
    const result = await axios.get(
      `https://www.reddit.com/r/${subreddit}/${sortType}.json?limit=100`
    );
    console.log(result);
    return result.data.data.children.map((post) => post.data);
  }
);


export const { setCurrentSort, setSubredditName } = subredditSlice.actions;

export const selectSubredditCurrentSort = (state) =>
  state.subreddit.currentSort;
export const selectSubredditName = (state) => state.subreddit.subredditName;
export const selectSubredditPosts = (state) => state.subreddit.posts;
export const selectSubredditLoadingStatus = (state) =>
  state.subreddit.status === "loading";
export const selectSubredditError = (state) => state.subreddit.error;

export default subredditSlice.reducer;
