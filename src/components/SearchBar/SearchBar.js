import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField, IconButton, InputAdornment } from "@mui/material";
import { selectSearchTerm, setSearchTerm } from "../../features/search/searchSlice";

const SearchBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchTerm = useSelector(selectSearchTerm);

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/search/?q=${searchTerm}`);
  };

  return (
    <Box>
      <form onSubmit={handleSearch}>
        <TextField
          id="search-field"
          placeholder="Search..."
          variant="outlined"
          value={searchTerm}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
            onChange={(event) => dispatch(setSearchTerm(event.target.value))}
        >
          <IconButton type="submit">
            <SearchIcon />
          </IconButton>
        </TextField>
      </form>
    </Box>
  );
};

export default SearchBar;
