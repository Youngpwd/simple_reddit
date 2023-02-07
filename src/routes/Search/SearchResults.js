import { useRef, useEffect, useState } from "react";
import { Container, Tabs, Tab, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSearchResults,
  selectSearchResults,
  selectSearchStatus,
  selectSearchTerm,
  selectType,
  setType,
} from "../../features/search/searchSlice";
import { useSearchParams } from "react-router-dom";
import { selectError } from "../../features/PopularPostSlice/PopularPostsSlice";
import Loading from "../../components/Loading/Loading";
import ErrorPage from "../../components/ErrorPage/ErrorPage";
import SinglePost from "../../components/SinglePost/SinglePost";
import { selectPostOpen } from "../../features/PostSlice/PostSlice";
import PostModal from "../../components/PostModal/PostModal";
import SubredditResults from "../../components/SubredditResults/SubredditResults";

const SearchResults = ({ matches }) => {
  const dispatch = useDispatch();

  const type = useSelector(selectType);
  const searchTerm = useSelector(selectSearchTerm);
  const loading = useSelector(selectSearchStatus);
  const error = useSelector(selectError);
  const searchResults = useSelector(selectSearchResults);
  const open = useSelector(selectPostOpen);

  const hasFetched = useRef(false);

  const [offset, setOffset] = useState(10);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [searchParams] = useSearchParams();
  const urlTerm = searchParams.get("q");

  useEffect(() => {
    if (searchTerm === urlTerm) {
      hasFetched.current = false;
    }
    if (!hasFetched.current) {
      dispatch(fetchSearchResults({ searchTerm: searchTerm, type: type }));
      hasFetched.current = true;
    }
  }, [dispatch, searchTerm, type, urlTerm]);

  const handleTabChange = (event, newValue) => {
    setOffset(10);
    setButtonDisabled(false);
    hasFetched.current = false;
    dispatch(setType(newValue));
  };

  const loadMorePost = () => {
    setOffset(offset + 10);
    if (offset >= searchResults.length - 1) {
      setButtonDisabled(!buttonDisabled);
    }
  };

  return (
    <Container maxWidth="md">
      <Tabs
        value={type}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Post" value="link" />
        <Tab label="Communites" value="sr" />
      </Tabs>
      <>
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorPage />
        ) : type === "link" ? (
          <>
            {searchResults.slice(0, offset).map((result) => (
              <SinglePost post={result} matches={matches} key={result.id} />
            ))}
            {!buttonDisabled && searchResults.length > 10 && (
              <Button variant="outlined" onClick={loadMorePost}>
                Load More
              </Button>
            )}
            {open && <PostModal open={open} matches={matches} />}
          </>
        ) : type === "sr" ? (
          <>
            {searchResults.slice(0, offset).map((result) => (
              <SubredditResults subreddit={result} key={result.id} />
            ))}
            {!buttonDisabled && searchResults.length > 10 && (
              <Button variant="outlined" onClick={loadMorePost}>
                Load More
              </Button>
            )}
          </>
        ) : (
          <ErrorPage />
        )}
      </>
    </Container>
  );
};

export default SearchResults;
