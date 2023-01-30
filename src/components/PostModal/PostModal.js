import {
  Box,
  Modal,
  Card,
  CardMedia,
  Typography,
  Container,
  CardHeader,
  CardContent,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPost,
  setPost,
  setPostOpen,
} from "../../features/PostSlice/PostSlice";
import { formattedTime } from "../../util/formatTime";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PostModal = ({ open, matches }) => {
  const dispatch = useDispatch();

  const post = useSelector(selectPost);

  const handleClose = () => {
    dispatch(setPostOpen(false));
    dispatch(setPost({}));
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Card raised={true}>
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
              />
            </Container>
          ) : post.post_hint === "image" ? (
            <Container maxWidth="sm">
              <a href={post.url} target="_blank" rel="noopener noreferrer">
              <CardMedia
                component="img"
                image={post.url_overridden_by_dest}
                alt={post.title}
                sx={{
                  maxHeight: `${matches ? "540px" : "200px"}`,
                }}
              />
              </a>
            </Container>
          ) : post.post_hint === "link" ? (
            <Container maxWidth="xs" sx={{ float: "right" }}>
              <a
                className="thumbnail-link"
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CardMedia
                  component="img"
                  image={post.thumbnail || post.url_overridden_by_dest}
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
              >
                {" "}
                {post.subreddit_name_prefixed}
              </Link>
            </Typography>
            <Typography variant="caption" color="textSecondary">
              posted by {post.author} {formattedTime(post.created_utc)}
            </Typography>
            <Typography align="left" mt={2}>
              {post.score} points
            </Typography>
            <Typography align="left">{post.num_comments} comments</Typography>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};

export default PostModal;
