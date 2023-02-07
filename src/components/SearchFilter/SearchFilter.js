import React from "react";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { setSort, selectSearchSort } from "../../features/search/searchSlice";
import { useDispatch, useSelector } from "react-redux";

const SearchFilter = () => {
  const dispatch = useDispatch();
  const sort = useSelector(selectSearchSort);

  const handleChange = (event) => {
    dispatch(setSort(event.target.value));
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120, float:"right" }} size="small">
      <InputLabel id="select-small">Filter</InputLabel>
      <Select
        labelId="select-small"
        id="select-small"
        value={sort}
        label="Filter"
        onChange={handleChange}
      >
        <MenuItem value="relevance">Relevance</MenuItem>
        <MenuItem value="hot">Hot</MenuItem>
        <MenuItem value="top">Top</MenuItem>
        <MenuItem value="new">New</MenuItem>
        <MenuItem value="comments">Most Comments</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SearchFilter;
