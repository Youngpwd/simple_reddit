import React, { useState } from "react";
import { Container, Tabs, Tab, Button } from "@mui/material";
import SinglePost from "../SinglePost/SinglePost";
import PostModal from "../PostModal/PostModal";

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
  const [open, setOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState({});

  const handleOpen = (post) => {
    setCurrentPost(post);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          <SinglePost
            post={post}
            matches={matches}
            key={post.id}
            handleOpen={handleOpen}
          />
        ))}
        {!buttonDisabled && posts.length > 10 && (
          <Button variant="outlined" onClick={loadMorePost}>
            Load More
          </Button>
        )}
        <PostModal open={open} handleClose={handleClose} post={currentPost} />
      </>
    </Container>
  );
};

export default Posts;
