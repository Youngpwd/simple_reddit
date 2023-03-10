import React from "react";
import { formattedTime } from "../../util/formatTime";
import ReactPlayer from "react-player";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Card,
  CardHeader,
  CardMedia,
  Typography,
  CardContent,
} from "@mui/material";
import {
  setPost,
  setPostOpen,
  setScrollY,
} from "../../features/PostSlice/PostSlice";
import { useDispatch } from "react-redux";

const SinglePost = ({ post, matches }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpen = (post) => {
    dispatch(setPost(post));
    // console.log(post, "this is post obj being dispatched to PostSlice");
    if (matches) {
      //add if statement that checks matches, if matches is false, nav to mobilePost
      //matches is 600px and up viewport
      dispatch(setPostOpen(true));
    } else {
      dispatch(setScrollY(window.scrollY));
      navigate("/post");
    }
  };

  const handlePlayerClick = (event) => {
    event.stopPropagation();
  };

  return (
    <Box key={post.id} mt="2rem">
      <Card
        raised={true}
        onClick={() => handleOpen(post)}
        sx={{ cursor: "pointer" }}
      >
        <CardHeader
          title={post.title}
          align="center"
          titleTypographyProps={{
            variant: matches ? "h6" : "title",
          }}
        />
        {post.post_hint === "hosted:video" ? (
          <Container maxWidth="sm">
            <ReactPlayer
              className="post-video"
              url={post.secure_media.reddit_video.hls_url}
              controls={true}
              onClick={handlePlayerClick}
            />
          </Container>
        ) : post.post_hint === "image" ? (
          <Container maxWidth="sm">
            <CardMedia
              component="img"
              image={post.url_overridden_by_dest}
              alt={post.title}
              sx={{
                maxHeight: `${matches ? "540px" : "200px"}`,
              }}
            />
          </Container>
        ) : post.post_hint === "link" ? (
          <Container maxWidth="xs" sx={{ float: "right" }}>
            <a
              className="thumbnail-link"
              href={post.url || post.preview.images[0].source.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CardMedia
                component="img"
                image={
                  post.thumbnail ||
                  post.url_overridden_by_dest ||
                  post.preview.images[0].source.url
                }
                style={{
                  width: `${post.thumbnail_width}px`,
                  height: `${post.thumbnail_height}px`,
                }}
              />
              <div className="link-overlay">{post.domain}</div>
            </a>
          </Container>
        ) : null}
        <CardContent>
          <Typography variant="subtitle2" color="secondary">
            <Link
              to={`/${post.subreddit_name_prefixed}`}
              style={{
                textDecoration: "none",
                color: "#00c4f3",
              }}
              onClick={handlePlayerClick}
            >
              {" "}
              {post.subreddit_name_prefixed}
            </Link>
            {(post.over_18 || post.over18) && (
              <span
                style={{ fontSize: "10px", color: "red", marginLeft: "3px" }}
              >
                **NSFW**
              </span>
            )}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            posted by {post.author} {formattedTime(post.created_utc)}
          </Typography>
          <Typography align="left" mt={2}>
            {post.score} points
          </Typography>
          <Typography align="left">
            {post.num_comments > 1 ? post.num_comments : 0} comments
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SinglePost;
