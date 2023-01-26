import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentSort,
  selectSubredditCurrentSort,
  selectSubredditError,
  selectSubredditLoadingStatus,
  selectSubredditPosts,
  fetchSubreddit,
  selectSubredditAbout,
} from "../../features/SubredditSlice/SubredditSlice";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Container,
  Box,
  Tabs,
  Tab,
  Button,
  CardMedia,
  Grid,
} from "@mui/material";
import Loading from "../../components/Loading/Loading";
import ErrorPage from "../../components/ErrorPage/ErrorPage";
import { formattedTime } from "../../util/formatTime";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import { formatNumber } from "../../util/formatNumber";

const Subreddit = ({ matches }) => {
  const posts = useSelector(selectSubredditPosts);
  const loading = useSelector(selectSubredditLoadingStatus);
  const error = useSelector(selectSubredditError);
  const currentSort = useSelector(selectSubredditCurrentSort);
  const about = useSelector(selectSubredditAbout);

  const { subreddit } = useParams();

  const [offset, setOffset] = useState(10);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubreddit({ sortType: currentSort, subreddit: subreddit }));
  }, [dispatch, currentSort, subreddit]);

  const loadMorePost = () => {
    setOffset(offset + 10);
    if (offset === 90) {
      setButtonDisabled(!buttonDisabled);
    }
  };

  const handleTabChange = (event, newValue) => {
    setOffset(10);
    setButtonDisabled(false);
    dispatch(setCurrentSort(newValue));
  };

  return (
    <>
      {!loading ? (
        <CardMedia
          component="img"
          image={
            about.banner_background_image !== ""
              ? about.banner_background_image.split("?")[0]
              : about.mobile_banner_image !== ""
              ? about.mobile_banner_image
              : about.header_img !== ""
              ? about.header_img
              : null
          }
          sx={{
            width: "100%",
            height: matches ? "200px" : "auto",
            backgroundRepeat: "no-repeat",
          }}
        />
      ) : null}

      <Grid
        container
        spacing={0}
        sx={{ marginTop: matches ? "1rem" : "0px" }}
        justifyContent="center"
      >
        <Grid item xs={12} sm={3} mt={3}>
          {!loading ? (
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
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  align="center"
                >
                  r/{subreddit}
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
                  <Typography
                    variant="caption"
                    component="span"
                    align="left"
                    p={1}
                  >
                    Active Users:{" "}
                    <b> {formatNumber(about.active_user_count)} </b>
                  </Typography>
                  <Typography
                    variant="caption"
                    component="span"
                    align="right"
                    p={1}
                  >
                    Subscribers:<b> {formatNumber(about.subscribers)}</b>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={9}>
          <Container
            maxWidth="md"
            sx={{ margin: `${matches ? "1px" : "1px auto"}` }}
          >
            <Tabs
              value={currentSort}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Hot" value="hot" />
              <Tab label="New" value="new" />
              <Tab label="Top" value="top" />
            </Tabs>
            {loading ? ( //potentially put this at start of return, remove the other loading check****
              <Loading />
            ) : error ? (
              <ErrorPage error={error} />
            ) : (
              <>
                {posts.slice(0, offset).map((post) => (
                  <Box key={post.id} mt="2rem">
                    <Card raised={true}>
                      <CardHeader
                        title={post.title}
                        align="center"
                        titleTypographyProps={{
                          variant: `${matches ? "h6" : "title"}`,
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
                          <a
                            href={post.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
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
                              image={
                                post.thumbnail || post.url_overridden_by_dest
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
                            style={{ textDecoration: "none", color: "#00c4f3" }}
                          >
                            {" "}
                            {post.subreddit_name_prefixed}
                          </Link>
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          posted by {post.author}{" "}
                          {formattedTime(post.created_utc)}
                        </Typography>
                        <Typography align="left" mt={2}>
                          {post.score} points
                        </Typography>
                        <Typography align="left">
                          {post.num_comments} comments
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
                {!buttonDisabled && (
                  <Button variant="outlined" onClick={loadMorePost}>
                    Load More
                  </Button>
                )}
              </>
            )}
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default Subreddit;
