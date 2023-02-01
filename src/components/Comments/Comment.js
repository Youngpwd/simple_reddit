import {
  ListItem,
  ListItemAvatar,
  Divider,
  Collapse,
  Avatar,
  ListItemText,
  ListItemButton,
  List,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";

const Comment = ({ comment, breakPointUp, parentAuthor }) => {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const result = await axios.get(
          `https://www.reddit.com/user/${comment.author}/about.json`
        );
        setUserData(result.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, [comment.author]);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem alignItems="flex-start">
        {userData ? (
          <ListItemAvatar>
            <Avatar
              alt={comment.author}
              src={userData.icon_img.split("?")[0]}
              style={{
                width: breakPointUp ? 50 : 30,
                height: breakPointUp ? 50 : 30,
              }}
            />
          </ListItemAvatar>
        ) : null}
        <ListItemText
          primaryTypographyProps={{
            variant: breakPointUp ? "subtitle" : "caption",
          }}
          primary={`${comment.author} ${
            !breakPointUp && parentAuthor ? `to ${parentAuthor}` : ""
          }`}
          secondary={comment.body}
          sx={{ mt: 2 }}
        />
        {comment.replies && comment.replies.data?.children.length > 1 && (
          <ListItemButton
            onClick={handleClick}
            sx={{ width: "fit-content", position: "absolute", right: 0 }}
          >
            {
              comment.replies.data.children.filter(
                (reply) => reply.data.author && reply.data.author.length !== 0
              ).length
            }{" "}
            {breakPointUp ? "Replies" : null}
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        )}
      </ListItem>
      <Divider />
      <Collapse in={open} timeout="auto" unmountOnExit>
        {comment.replies && (
          <List disablePadding sx={{ marginLeft: breakPointUp ? "30px" : 0 }}>
            {comment.replies.data.children
              .filter(
                (reply) => reply.data.author && reply.data.author.length !== 0
              )
              .map((reply) => (
                <Comment
                  key={reply.data.id}
                  comment={reply.data}
                  breakPointUp={breakPointUp}
                  parentAuthor={comment.author}
                />
              ))}
          </List>
        )}
      </Collapse>
    </>
  );
};

export default Comment;
