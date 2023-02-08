import React from "react";
import { Link, Typography, Container, Card } from "@mui/material";

const Footer = ({ matches }) => {
  return (
    <Container
      maxWidth=""
      disableGutters={true}
      sx={{
        padding: ".5rem",
        margin: ".7rem 0 0 0",
      }}
    >
      <Card
        raised={true}
        sx={
          matches
            ? {
                margin: "1rem auto 0",
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
              }
            : {
                marginTop: 5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }
        }
      >
        <Typography variant="caption" p={3}>
          Data displayed on this website does not belong to me and is used for
          educational purposes only.
        </Typography>
        <Link
          href="https://github.com/Youngpwd/simple_reddit"
          target="_blank"
          color="inherit"
          variant="caption"
          sx={
            matches
              ? {
                  "&:hover": { textDecorationColor: "red", fontSize: "2rem" },
                }
              : null
          }
          p={3}
        >
          https://github.com/Youngpwd/simple_reddit
        </Link>
      </Card>
    </Container>
  );
};

export default Footer;
