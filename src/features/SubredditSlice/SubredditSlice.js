import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  about: {},
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubreddit.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubreddit.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.about = action.payload.about;
        state.posts = action.payload.posts;
      })
      .addCase(fetchSubreddit.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const fetchSubreddit = createAsyncThunk(
  "subreddit/fetchSubreddit",
  async (payload) => {
    const { sortType, subreddit } = payload;
    let aboutResult;
    try {
       aboutResult = await axios.get(
        `https://www.reddit.com/r/${subreddit}/about.json`
      )
    } catch (error) {
      console.log(error)
    }
    const postsResult = await axios.get(
      `https://www.reddit.com/r/${subreddit}/${sortType}.json?limit=100`
    );
    console.log(aboutResult.data.data, postsResult.data.data);
    return {
      about: aboutResult.data.data,
      posts: postsResult.data.data.children.map((post) => post.data),
    };
  }
);


export const { setCurrentSort } = subredditSlice.actions;

export const selectSubredditCurrentSort = (state) =>
  state.subreddit.currentSort;
export const selectSubredditPosts = (state) => state.subreddit.posts;
export const selectSubredditLoadingStatus = (state) =>
  state.subreddit.status === "loading";
export const selectSubredditError = (state) => state.subreddit.error;
export const selectSubredditAbout = (state) => state.subreddit.about;

export default subredditSlice.reducer;
