import React from "react";
import { Link, Typography, Container } from "@mui/material";

const Footer = () => {
  return (
    <Container maxWidth="" disableGutters={true} sx={{marginTop: 5, display: "flex", justifyContent: "space-evenly"}} >
      <Typography variant="body2">
        Data displayed on this website does not belong to me and is used for
        educational purposes only.
      </Typography>
      <Link href="https://github.com/Youngpwd/simple_reddit" target="_blank" color="inherit">
        https://github.com/Youngpwd/simple_reddit
      </Link>
    </Container>
  );
};

export default Footer;
