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
import { Grid } from "@mui/material";
import Loading from "../../components/Loading/Loading";
import ErrorPage from "../../components/ErrorPage/ErrorPage";
import { useParams } from "react-router-dom";
import SubredditBanner from "../../components/SubredditBanner/SubredditBanner";
import SubredditAbout from "../../components/SubredditAbout/SubredditAbout";
import Posts from "../../components/Posts/Posts";

const Subreddit = ({ matches }) => {
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
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorPage error={error} />
      ) : (
        <>
          <SubredditBanner matches={matches} />

          <Grid
            container
            spacing={0}
            sx={{ marginTop: matches ? "1rem" : "0px" }}
            justifyContent="center"
          >
            <Grid item xs={12} sm={3} mt={3}>
              <SubredditAbout subredditName={subreddit} />
            </Grid>

            <Grid item xs={12} sm={9}>
              <Posts
                matches={matches}
                currentSort={currentSort}
                handleTabChange={handleTabChange}
                posts={posts}
                offset={offset}
                buttonDisabled={buttonDisabled}
                loadMorePost={loadMorePost}
              />
            </Grid>
            
          </Grid>
        </>
      )}
    </>
  );
};

export default Subreddit;
