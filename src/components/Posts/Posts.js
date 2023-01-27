import React from "react";
import { Container, Tabs, Tab, Button } from "@mui/material";
import SinglePost from "../SinglePost/SinglePost";

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
      </>
    </Container>
  );
};

export default Posts;
