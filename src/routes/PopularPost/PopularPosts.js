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
import Loading from "../../components/Loading/Loading";
import ErrorPage from "../../components/ErrorPage/ErrorPage";
import Posts from "../../components/Posts/Posts";

const PopularPosts = ({ matches }) => {
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
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorPage error={error} />
      ) : (
        <Posts
          matches={matches}
          currentSort={currentSort}
          handleTabChange={handleTabChange}
          posts={posts}
          offset={offset}
          buttonDisabled={buttonDisabled}
          loadMorePost={loadMorePost}
        />
      )}
    </>
  );
};

export default PopularPosts;
