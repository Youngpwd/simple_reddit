import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const POST_KEY = "post_data";

const initialState = {
  postInfo: JSON.parse(localStorage.getItem(POST_KEY)) || {},
  postOpen: false,
  comments: [],
  status: "idle",
  error: null,
  scrollY: null, //for mobile
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.postInfo = action.payload;
      localStorage.setItem(POST_KEY, JSON.stringify(state.postInfo));
    },
    setPostOpen: (state, action) => {
      state.postOpen = action.payload;
    },
    setScrollY: (state, action) => {
      state.scrollY = action.payload;
    }
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

export const { setPost, setPostOpen, setScrollY } = postSlice.actions;
export const selectPost = (state) => state.post.postInfo;
export const selectPostOpen = (state) => state.post.postOpen;
export const selectComments = (state) => state.post.comments;
export const selectPostLoadingStatus = (state) =>
  state.post.status === "loading";
export const selectPostError = (state) => state.post.error;
export const selectScrollY = (state) => state.post.scrollY;

export default postSlice.reducer;
