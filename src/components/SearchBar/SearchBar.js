import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField, IconButton, InputAdornment } from "@mui/material";
import { setSearchTerm } from "../../features/search/searchSlice";

const SearchBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(setSearchTerm(term));
    navigate(`/search/?q=${term}`);
  };

  return (
    <Box>
      <form onSubmit={handleSearch}>
        <TextField
          id="search-field"
          placeholder="Search..."
          variant="outlined"
          value={term}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={(event) => setTerm(event.target.value)}
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
