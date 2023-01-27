import React, { useState, useEffect } from "react";
import { CardMedia } from "@mui/material";
import { useSelector } from "react-redux";
import { selectSubredditAbout } from "../../features/SubredditSlice/SubredditSlice";

const SubredditBanner = ({ matches }) => {
  const about = useSelector(selectSubredditAbout);
  const [bannerOn, setBannerOn] = useState(true);
  const [bannerImg, setBannerImg] = useState("");

  const imageBanner = () => {
    return about.banner_background_image?.length > 0
      ? setBannerImg(about.banner_background_image.split("?")[0])
      : about.mobile_banner_image !== ""
      ? setBannerImg(about.mobile_banner_image)
      : setBannerOn(false);
  };

  useEffect(() => {
    imageBanner();

    return () => {
      setBannerImg("");
    };
  });

  return (
    <>
      {bannerOn ? (
        <CardMedia
          component="img"
          image={bannerImg}
          sx={{
            width: "100%",
            height: matches ? "200px" : "auto",
          }}
        />
      ) : null}
    </>
  );
};

export default SubredditBanner;
