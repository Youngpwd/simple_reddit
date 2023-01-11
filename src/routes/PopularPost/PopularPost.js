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
  Select,
  MenuItem,
  Typography,
  Container,
  Box,
  CircularProgress,
} from "@mui/material";
import Loading from "../../components/Loading/Loading";

const PopularPosts = () => {
  const posts = useSelector(selectPosts);
  const loading = useSelector(selectLoadingStatus);
  const error = useSelector(selectError);
  const currentSort = useSelector(selectCurrentSort);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPopularPosts(currentSort));
  }, [dispatch, currentSort]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Container maxWidth="md" sx={{ marginTop: "1rem" }}>
        <Select
          value={currentSort}
          onChange={(e) => dispatch(setCurrentSort(e.target.value))}
          sx={{ marginBottom: "1rem" }}
        >
          <MenuItem value="hot">Hot</MenuItem>
          <MenuItem value="new">New</MenuItem>
          <MenuItem value="top">Top</MenuItem>
        </Select>
        {posts.map((post) => (
          <Box key={post.id} sx={{}} mt="2rem">
            <Card key={post.id} raised={true}>
              <CardHeader title={post.title} />
              <CardContent>
                <Typography variant="subtitle2" color="secondary" >
                  {" "}
                  {post.subreddit_name_prefixed}
                </Typography>

                <CircularProgress size="lg" />
                <Typography>{post.author}</Typography>
                <Typography>{post.score}</Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Container>
    </>
  );
};

export default PopularPosts;
