import { useState } from "react";
import { Route, Routes } from "react-router";
import { CssBaseline, Box, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header/Header";
import { createAppTheme } from "../util/appTheme";

const App = () => {
  const [mode, setMode] = useState("light");
  
  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <>
      <ThemeProvider theme={createAppTheme(mode)}>
        <CssBaseline />
        <Container maxWidth="" disableGutters={true}>
          <Box sx={{ height: "100vh" }}>
            <Header toggleMode={toggleMode} />
            {/* <Routes>
              <Route path="/" />
              <Route path="search" />
              <Route path="r">
                <Route path=":subreddit" />
              </Route>
            </Routes> */}
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
