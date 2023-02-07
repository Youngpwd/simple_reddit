import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchTerm: "",
    type: "link",
    sort: "relevance",
    searchResults: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchResults = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (payload) => {
    const { searchTerm, type, nsfw, sort } = payload;
    const result = await axios.get(
      `https://www.reddit.com/search.json?q=${searchTerm}&type=${type}&include_over_18=${nsfw}&sort=${sort}&limit=100`
    );
    console.log(result.data.data.children);
    return result.data.data.children.map((item) => item.data);
  }
);

export const { setSearchTerm, setType, setSort } = searchSlice.actions;
export const selectType = (state) => state.search.type;
export const selectSearchTerm = (state) => state.search.searchTerm;
export const selectSearchStatus = (state) => state.search.status === "loading";
export const selectSearchError = (state) => state.search.error;
export const selectSearchResults = (state) => state.search.searchResults;
export const selectSearchSort = state => state.search.sort;

export default searchSlice.reducer;
