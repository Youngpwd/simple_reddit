import React from "react";
import { Link, Typography, Container, Card } from "@mui/material";
import { selectLoadingStatus } from "../../features/PopularPostSlice/PopularPostsSlice";
import { selectPostLoadingStatus } from "../../features/PostSlice/PostSlice";
import { selectSearchStatus } from "../../features/search/searchSlice";
import { selectSubredditLoadingStatus } from "../../features/SubredditSlice/SubredditSlice";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Loading from "../Loading/Loading";

const Footer = ({ matches }) => {
  const popularPostsLoading = useSelector(selectLoadingStatus);
  const postLoading = useSelector(selectPostLoadingStatus);
  const searchLoading = useSelector(selectSearchStatus);
  const subredditLoading = useSelector(selectSubredditLoadingStatus);
  const location = useLocation();

  if (location.pathname === "/post") {
    return null;
  }

  return popularPostsLoading ||
    postLoading ||
    searchLoading ||
    subredditLoading ? (
    <Loading />
  ) : (
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
        sx={{
          margin: "1rem auto 0",
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: !matches ? "column" : "row",
          width: "100%",
        }}
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
          p={3}
          sx={{
            "&:hover": { textDecorationColor: "red", fontSize: "2rem" },
          }}
        >
          https://github.com/Youngpwd/simple_reddit
        </Link>
      </Card>
    </Container>
  );
};

export default Footer;
