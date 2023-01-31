import { createTheme } from "@mui/material";

export const createAppTheme = (mode) => {
  const appTheme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: "#bf1d1d",
        light: "#cb4a4a",
        dark: "#851414",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#00c4f3",
        contrastText: "#6d4040",
      },
    },
    components: {
      MuiCardMedia: {
        styleOverrides: {
          root: {
            // objectFit: "cover",
            objectFit: "cover",
            maxWidth: "100%",
            width: "100%",
            margin: "0px auto ",
          },
        },
      },
    },
  });
  return appTheme;
};

export const subredditPostsStyle = {
  margin: "auto 2rem",
};


export const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #bf1d1d",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll", 
};