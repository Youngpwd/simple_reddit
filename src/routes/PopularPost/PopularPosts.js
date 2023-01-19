import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentSort,
  selectCurrentSort,
  selectError,
  selectLoadingStatus,
  selectPosts,
  fetchPopularPosts,
} from "../../features/PopularPostSlice/PopularPostsSlice";
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

const PopularPosts = () => {
  const posts = useSelector(selectPosts);
  const loading = useSelector(selectLoadingStatus);
  const error = useSelector(selectError);
  const currentSort = useSelector(selectCurrentSort);

  const [offset, setOffset] = useState(10);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPopularPosts(currentSort));
  }, [dispatch, currentSort]);

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
                  <CardHeader title={post.title} />
                  {post.post_hint === "hosted:video" ? (
                    <Container maxWidth="sm">
                      <ReactPlayer
                        url={post.secure_media.reddit_video.hls_url}
                        controls={true}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "540px",
                          objectFit: "contain",
                          backgroundColor: "#000",
                        }}
                      />
                    </Container>
                  ) : post.preview ? (
                    <Container maxWidth="sm">
                      <CardMedia
                        component="img"
                        image={post.url_overridden_by_dest}
                        alt={post.title}
                        sx={{
                          objectFit: "cover",
                          maxWidth: "100%",
                          maxHeight: "540px",
                          width: "100%",
                        }}
                      />
                    </Container>
                  ) : null}
                  <CardContent>
                    <Typography variant="subtitle2" color="secondary">
                      {post.subreddit_name_prefixed}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      posted by {post.author} {formattedTime(post.created_utc)}
                    </Typography>
                    <Typography>{post.score} points</Typography>
                    <Typography>{post.num_comments} comments</Typography>
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

export default PopularPosts;
