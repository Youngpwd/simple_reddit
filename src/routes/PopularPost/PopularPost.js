import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPopularPosts } from "../../features/PopularPostSlice/PopularPostsSlice";
import {
  setCurrentSort,
  selectCurrentSort,
  selectError,
  selectLoadingStatus,
  selectPosts,
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
} from "@mui/material";
import Loading from "../../components/Loading/Loading";
import ErrorPage from "../../components/ErrorPage/ErrorPage";

const PopularPosts = () => {
  const posts = useSelector(selectPosts);
  const loading = useSelector(selectLoadingStatus);
  const error = useSelector(selectError);
  const currentSort = useSelector(selectCurrentSort);

  const dispatch = useDispatch();

  const handleTabChange = (event, newValue) => {
    dispatch(setCurrentSort(newValue));
  };

  useEffect(() => {
    dispatch(fetchPopularPosts(currentSort));
  }, [dispatch, currentSort]);

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
            {posts.map((post) => (
              <Box key={post.id} sx={{}} mt="2rem">
                <Card key={post.id} raised={true}>
                  <CardHeader title={post.title} />
                  <CardContent>
                    <Typography variant="subtitle2" color="secondary">
                      {post.subreddit_name_prefixed}
                    </Typography>
                    <Typography>{post.author}</Typography>
                    <Typography>{post.score}</Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </>
        )}
      </Container>
    </>
  );
};

export default PopularPosts;