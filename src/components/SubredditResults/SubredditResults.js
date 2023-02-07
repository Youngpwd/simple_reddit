import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { formatNumber } from "../../util/formatNumber";

const SubredditResults = ({ subreddit, matches }) => {
  return (
    <Card
      sx={{
        minHeight: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
      variant="outlined"
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          flexDirection: !matches ? "column" : null,
          textAlign: !matches ? "center" : null,
          alignContent: !matches ? "center" : null,
        }}
      >
        <Box
          mr={10}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: matches ? "flex-start" : "center",
            width: "auto",
            marginRight: matches ? "5rem" : 0,
          }}
        >
          <CardMedia
            component="img"
            image={
              subreddit.icon_img !== ""
                ? subreddit.icon_img
                : subreddit.community_icon !== ""
                ? subreddit.community_icon.split("?")[0]
                : "https://via.placeholder.com/150/bf1d1d?Text=Missing+Img"
            }
            sx={{
              width: "50px",
              height: "50px",
              objectFit: "contain",
              borderRadius: "50%",
              marginRight: 1,
            }}
          />
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: "bold", width: "auto" }}
          >
            /r/{subreddit.display_name}
          </Typography>
          {subreddit.over18 && (
            <span style={{ fontSize: "10px", color: "red", marginLeft: "3px" }}>
              **NSFW**
            </span>
          )}
        </Box>
        <Typography
          variant="body2"
          align="left"
          sx={{ width: matches ? "50%" : "100%" }}
          mt={!matches ? 5 : null}
        >
          {subreddit.public_description}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "gray",
            width: !matches ? "100%" : null,
          }}
          p={3}
        >
          Members:<b> {formatNumber(subreddit.subscribers)}</b>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SubredditResults;
