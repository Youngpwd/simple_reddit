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



