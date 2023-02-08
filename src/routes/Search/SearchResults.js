import { useRef, useEffect, useState } from "react";
import { Container, Tabs, Tab, Button, Chip, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSearchResults,
  selectSearchResults,
  selectSearchSort,
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
import SearchFilter from "../../components/SearchFilter/SearchFilter";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";

const SearchResults = ({ matches }) => {
  const dispatch = useDispatch();

  const type = useSelector(selectType);
  const searchTerm = useSelector(selectSearchTerm);
  const loading = useSelector(selectSearchStatus);
  const error = useSelector(selectError);
  const searchResults = useSelector(selectSearchResults);
  const open = useSelector(selectPostOpen);
  const sort = useSelector(selectSearchSort);

  const hasFetched = useRef(false);

  const [offset, setOffset] = useState(10);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [nsfwToggle, setNsfwToggle] = useState(0);
  const [chipStyle, setChipStyle] = useState("outlined");

  const [searchParams] = useSearchParams();
  const urlTerm = searchParams.get("q");

  useEffect(() => {
    if (searchTerm === urlTerm) {
      hasFetched.current = false;
    }
    if (!hasFetched.current) {
      setOffset(10);
      dispatch(
        fetchSearchResults({
          searchTerm: searchTerm,
          type: type,
          nsfw: nsfwToggle,
          sort: sort,
        })
      );
      hasFetched.current = true;
    }
  }, [dispatch, searchTerm, type, urlTerm, nsfwToggle, sort]);

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

  const handleClick = () => {
    setOffset(10);
    if (nsfwToggle === 0) {
      setNsfwToggle(1);
      setChipStyle("filled");
    } else {
      setNsfwToggle(0);
      setChipStyle("outlined");
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
      <Container
        disableGutters={true}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <Chip
          label="NSFW"
          variant={chipStyle}
          onClick={handleClick}
          avatar={<Avatar>18+</Avatar>}
          color="primary"
          sx={{ margin: "auto 0" }}
        />
        {type === "link" && <SearchFilter />}
      </Container>
      <>
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorPage />
        ) : type === "link" ? (
          <>
            <Container sx={{ marginTop: "5rem" }}>
              {searchResults.slice(0, offset).map((result) => (
                <SinglePost post={result} matches={matches} key={result.id} />
              ))}
              {!buttonDisabled && searchResults.length > 10 && (
                <div className="bottom-button">
                  <Button variant="outlined" onClick={loadMorePost}>
                    Load More
                  </Button>
                  <ScrollToTopButton />
                </div>
              )}

              {open && <PostModal open={open} matches={matches} />}
            </Container>
          </>
        ) : type === "sr" ? (
          <>
            {searchResults
              .filter((result) => result.subscribers !== null)
              .slice(0, offset)
              .map((result) => (
                <SubredditResults
                  subreddit={result}
                  key={result.id}
                  matches={matches}
                />
              ))}
            {!buttonDisabled && searchResults.length > 10 && (
              <div className="bottom-button">
                <Button variant="outlined" onClick={loadMorePost}>
                  Load More
                </Button>
                <ScrollToTopButton />
              </div>
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
