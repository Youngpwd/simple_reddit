import { useEffect, useState } from "react";
import { IconButton, ThemeProvider } from "@mui/material";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import "./ScrollToTopButton.css";
import { scrollTheme } from "../../util/appTheme";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    showButton && (
      <ThemeProvider theme={scrollTheme}>
        <IconButton
          sx={{ position: "absolute", right: "10rem" }}
          onClick={handleClick}
          color="primary"
        >
          <ArrowUpwardRoundedIcon
            sx={{
              width: "4rem",
              height: "4rem",
              boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
              borderRadius: 8,
              padding: "1rem",
            }}
          />
        </IconButton>
      </ThemeProvider>
    )
  );
};

export default ScrollToTopButton;