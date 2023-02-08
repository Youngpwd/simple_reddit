import { useState } from "react";
import { Route, Routes } from "react-router";
import { CssBaseline, Box, Container, useMediaQuery } from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import Header from "../components/Header/Header";
import { createAppTheme } from "../util/appTheme";
import PopularPosts from "../routes/PopularPost/PopularPosts";
import Subreddit from "../routes/Subreddit/Subreddit";
import SearchResults from "../routes/Search/SearchResults";
import "../App.css";
import MobilePost from "../routes/Mobile/MobilePost";
import Footer from "../components/Footer/Footer";

const App = () => {
  const [mode, setMode] = useState("light");
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <>
      <ThemeProvider theme={createAppTheme(mode)}>
        <CssBaseline />
        <Container maxWidth={false} disableGutters={true}>
          <Header toggleMode={toggleMode} mode={mode} matches={matches} />

          <Box>
            <Routes>
              <Route path="/" element={<PopularPosts matches={matches} />} />
              <Route path="/r">
                <Route
                  path=":subreddit"
                  element={<Subreddit matches={matches} />}
                />
              </Route>
              {!matches && <Route path="/post" element={<MobilePost />} />}
              <Route
                path="/post"
                element={<PopularPosts matches={matches} />}
              />
              <Route
                path="/search"
                element={<SearchResults matches={matches} />}
              />
            </Routes>
          </Box>
          <Footer matches={matches} />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
