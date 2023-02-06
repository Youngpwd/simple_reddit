import React from "react";
import RedditIcon from "@mui/icons-material/Reddit";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  Box,
  Toolbar,
  Typography,
  IconButton,
  AppBar,
  Switch,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const modeStyle = { width: "1em", height: "none", m: "auto 0" };

const Header = ({ toggleMode, mode, matches }) => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar
          sx={{ justifyContent: "space-between", alignContent: "center" }}
        >
          <Link to="/">
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{
                mr: 2,
                color: mode === "light" ? "#fff" : "#bf1d1d",
              }}
            >
              <RedditIcon />
            </IconButton>
          </Link>

          {matches ? (
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              noWrap={true}
            >
              Simple Reddit
            </Typography>
          ) : null}
          <SearchBar/>
          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignContent: "center",
            }}
          >
            {mode === "light" ? (
              <Brightness7Icon sx={modeStyle} />
            ) : (
              <Brightness4Icon sx={modeStyle} />
            )}
            <Switch edge="end" onClick={() => toggleMode()} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
