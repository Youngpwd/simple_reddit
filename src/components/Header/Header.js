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

const Header = ({ toggleMode, mode }) => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <RedditIcon />
          </IconButton>
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
