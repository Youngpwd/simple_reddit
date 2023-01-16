import { createTheme } from "@mui/material";

export const createAppTheme = (mode) => {
  const appTheme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: "#bf1d1d",
        light: '#cb4a4a',
        dark: '#851414',
        contrastText: '#ffffff',
      },
      secondary: {
        main: "#00c4f3",
        contrastText: "#6d4040",
      },
    },
    overrides: {
      MuiSwitch: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
          margin: 8,
        },
        switchBase: {
          padding: 1,
          "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + $track": {
              opacity: 1,
              border: "none",
            },
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 13,
          border: "1px solid #bdbdbd",
          backgroundColor: "#fafafa",
          opacity: 1,
          transition:
            "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },
      },
      MuiButton: {
        root: {
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          border: 0,
          borderRadius: 3,
          boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
          color: "white",
          height: 48,
          padding: "0 30px",
        },
      },
    },
  });
  return appTheme;
};


export const scrollTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#bf1d1d",
    }
  }
});