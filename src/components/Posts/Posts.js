import React from "react";
import { Container, Tabs, Tab, Button } from "@mui/material";
import SinglePost from "../SinglePost/SinglePost";
import PostModal from "../PostModal/PostModal";
import { useSelector } from "react-redux";
import { selectPostOpen } from "../../features/PostSlice/PostSlice";

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
  const open = useSelector(selectPostOpen);

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
          <Button variant="outlined" onClick={loadMorePost}>
            Load More
          </Button>
        )}
        {open && <PostModal open={open} />}
      </>
    </Container>
  );
};

export default Posts;
