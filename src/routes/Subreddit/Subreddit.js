import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentSort,
  selectSubredditCurrentSort,
  selectSubredditError,
  selectSubredditLoadingStatus,
  selectSubredditPosts,
  fetchSubreddit,
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
} from "@mui/material";
import Loading from "../../components/Loading/Loading";
import ErrorPage from "../../components/ErrorPage/ErrorPage";
import { formattedTime } from "../../util/formatTime";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";

const Subreddit = () => {
  const posts = useSelector(selectSubredditPosts);
  const loading = useSelector(selectSubredditLoadingStatus);
  const error = useSelector(selectSubredditError);
  const currentSort = useSelector(selectSubredditCurrentSort);

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
      <Container maxWidth="md" sx={{ marginTop: "1rem" }}>
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
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorPage error={error} />
        ) : (
          <>
            {posts.slice(0, offset).map((post) => (
              <Box key={post.id} mt="2rem">
                <Card raised={true}>
                  <CardHeader title={post.title} align="center" />
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
                          sx={{ maxHeight: "540px" }}
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
                        style={{ textDecoration: "none", color: "#00c4f3" }}
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
    </>
  );
};

export default Subreddit;
