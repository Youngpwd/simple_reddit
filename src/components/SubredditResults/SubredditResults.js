import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

const SubredditResults = ({ subreddit }) => {
  return (
    <Card
      sx={{
        minHeight: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      variant="outlined"
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box
          mr={10}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
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
              marginRight: 2,
            }}
          />
          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
            /r/{subreddit.display_name}
          </Typography>
          {subreddit.over18 && (
            <span style={{ fontSize: "10px", color: "red", marginLeft: "3px" }}>
              **NSFW**
            </span>
          )}
        </Box>
        <Typography variant="body1">{subreddit.public_description}</Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.75rem",
            color: "gray",
          }}
        >
          {subreddit.memberCount} members
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SubredditResults;
