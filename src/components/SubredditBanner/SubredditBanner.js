import React from "react";
import { CardMedia } from "@mui/material";
import { useSelector } from "react-redux";
import { selectSubredditAbout } from "../../features/SubredditSlice/SubredditSlice";

const SubredditBanner = ({ matches }) => {
  const about = useSelector(selectSubredditAbout);
  const imageBanner = () => {
    return about.banner_background_image?.length > 0
      ? about.banner_background_image.split("?")[0]
      : about.mobile_banner_image !== ""
      ? about.mobile_banner_image
      : about.header_img !== ""
      ? about.header_img
      : null;
  };

  return (
    <CardMedia
      component="img"
      image={imageBanner()}
      sx={{
        width: "100%",
        height: matches ? "200px" : "auto",
      }}
    />
  );
};

export default SubredditBanner;
