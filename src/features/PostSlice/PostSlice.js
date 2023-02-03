import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  postInfo: {},
  postOpen: false,
  comments: [],
  status: "idle",
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.postInfo = action.payload;
    },
    setPostOpen: (state, action) => {
      state.postOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const fetchComments = createAsyncThunk(
  "post/fetchComments",
  async (permalink) => {
    let commentResults;
    try {
      commentResults = await axios.get(
        `https://www.reddit.com${permalink}.json`
      );
    } catch (error) {
      console.log(error);
    }
    // console.log(commentResults.data); //[1].data.children
    return commentResults.data[1].data.children.map((comment) => comment.data);
  }
);

export const { setPost, setPostOpen } = postSlice.actions;
export const selectPost = (state) => state.post.postInfo;
export const selectPostOpen = (state) => state.post.postOpen;
export const selectComments = (state) => state.post.comments;
export const selectPostLoadingStatus = (state) =>
  state.post.status === "loading";
export const selectPostError = (state) => state.post.error;

export default postSlice.reducer;
