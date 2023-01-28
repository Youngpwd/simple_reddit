import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postInfo: {},
  postOpen: false,
  comments: [],
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
});

export const { setPost, setPostOpen } = postSlice.actions;
export const selectPost = (state) => state.post.postInfo;
export const selectPostOpen = (state) => state.post.postOpen;

export default postSlice.reducer;
