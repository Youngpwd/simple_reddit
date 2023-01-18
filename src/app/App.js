import { useState } from "react";
import { Route, Routes } from "react-router";
import { CssBaseline, Box, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header/Header";
import { createAppTheme } from "../util/appTheme";
import PopularPosts from "../routes/PopularPost/PopularPosts";
import ScrollToTopButton from "../components/ScrollToTopButton/ScrollToTopButton";

const App = () => {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <>
      <ThemeProvider theme={createAppTheme(mode)}>
        <CssBaseline />
        <Container maxWidth="lg" disableGutters={true}>
          <Header toggleMode={toggleMode} mode={mode} />

          <Box>
            <Routes>
              <Route path="/" element={<PopularPosts />} />
              {/* <Route path="search" />
              <Route path="r">
                <Route path=":subreddit" />
              </Route> */}
            </Routes>
          </Box>

          <ScrollToTopButton />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
