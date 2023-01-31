import {
  Box,
  Card,
  CardMedia,
  Typography,
  Container,
  CardHeader,
  CardContent,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPost,
  fetchComments,
  selectPostLoadingStatus,
  selectPostError,
} from "../../features/PostSlice/PostSlice";
import { formattedTime } from "../../util/formatTime";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import Comments from "../../components/Comments/Comments";
import Loading from "../../components/Loading/Loading";
import ErrorPage from "../../components/ErrorPage/ErrorPage";

const MobilePost = () => {
  const dispatch = useDispatch();
  const hasFetched = useRef(false);
  const post = useSelector(selectPost);
  const loading = useSelector(selectPostLoadingStatus);
  const error = useSelector(selectPostError);

  useEffect(() => {
    if (!hasFetched.current) {
      dispatch(fetchComments(post.permalink));
      hasFetched.current = true;
    }
  }, [dispatch, post.permalink]);

  const postBody = (post) => {
    if (post.selftext) {
      return post.selftext;
    } else if (post.url) {
      return (
        <a
          href={post.url}
          style={{
            color: post.author_flair_background_color
              ? `${post.author_flair_background_color}`
              : "#00c4f3",
          }}
        >
          {post.domain}
        </a>
      );
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorPage />
      ) : (
        <Box>
          <Card raised={true}>
            <CardHeader
              title={post.title}
              align="center"
              titleTypographyProps={{
                variant: "title",
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
                      maxHeight: "200px",
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
              <Typography variant="body1" align="justify">
                {postBody(post)}
              </Typography>
            </CardContent>
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
              <Typography align="left">
                {post.num_comments > 1 ? post.num_comments : 0} comments
              </Typography>
            </CardContent>
            <CardContent>
              {!post.num_comments ? (
                <Typography variant="body2">{post.body}</Typography>
              ) : (
                post.num_comments > 0 && (
                  <div
                    style={{
                      overflowY: "scroll",
                      overflowX: "hidden",
                      height: "500px",
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    <Comments />
                  </div>
                )
              )}
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  );
};

export default MobilePost;
