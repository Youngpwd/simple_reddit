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

const Header = ({ toggleMode, mode }) => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
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
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            noWrap={true}
          >
            Simple Reddit
          </Typography>
          {mode === "light" ? <Brightness7Icon /> : <Brightness4Icon />}
          <Switch edge="end" onClick={() => toggleMode()} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
