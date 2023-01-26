import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { selectSubredditAbout } from "../../features/SubredditSlice/SubredditSlice";
import { formatNumber } from "../../util/formatNumber";

const SubredditAbout = ({ subredditName }) => {
  const about = useSelector(selectSubredditAbout);
  return (
    <Card>
      <CardMedia
        component="img"
        image={
          about.icon_img !== ""
            ? about.icon_img
            : about.community_icon !== ""
            ? about.community_icon.split("?")[0]
            : null
        }
        sx={{
          width: "100px",
          height: "100px",
          objectFit: "contain",
          borderRadius: "50%",
          marginTop: "1rem",
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2" align="center">
          r/{subredditName}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          component="p"
          mt={3}
          mb={4}
        >
          {about.public_description}
        </Typography>
        <hr style={{ marginBottom: "1rem" }} />
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Typography variant="caption" component="span" align="left" p={1}>
            Active Users: <b> {formatNumber(about.active_user_count)} </b>
          </Typography>
          <Typography variant="caption" component="span" align="right" p={1}>
            Subscribers:<b> {formatNumber(about.subscribers)}</b>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SubredditAbout;
