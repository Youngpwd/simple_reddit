import React, { useEffect } from "react";
import { Container, Tabs, Tab, Button } from "@mui/material";
import SinglePost from "../SinglePost/SinglePost";
import PostModal from "../PostModal/PostModal";
import { useSelector } from "react-redux";
import {
  selectPostOpen,
  selectScrollY,
} from "../../features/PostSlice/PostSlice";
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";

const Posts = ({
  matches,
  currentSort,
  handleTabChange,
  posts,
  offset,
  buttonDisabled,
  loadMorePost,
  style,
}) => {
  const scrollY = useSelector(selectScrollY);
  const open = useSelector(selectPostOpen);

  useEffect(() => {
    window.scrollTo(0, scrollY);
    // eslint-disable-next-line
  }, []);

  return (
    <Container maxWidth="md" sx={matches ? style : { margin: "auto" }}>
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
      <>
        {posts.slice(0, offset).map((post) => (
          <SinglePost post={post} matches={matches} key={post.id} />
        ))}
        {!buttonDisabled && posts.length > 10 && (
          <div className="bottom-button">
            <Button variant="outlined" onClick={loadMorePost}>
              Load More
            </Button>
            <ScrollToTopButton />
          </div>
        )}
        {open && <PostModal open={open} matches={matches} />}
      </>
    </Container>
  );
};

export default Posts;
