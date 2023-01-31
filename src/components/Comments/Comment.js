import {
  ListItem,
  ListItemAvatar,
  Divider,
  Collapse,
  Avatar,
  //   Typography,
  ListItemText,
  ListItemButton,
  List,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { useState } from "react";

const Comment = ({ comment }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            alt={comment.author}
            src={comment.thumbnail}
            style={{ width: 50, height: 50 }}
          />
        </ListItemAvatar>
        <ListItemText primary={comment.author} secondary={comment.body} />
        {(comment.replies && comment.replies.data?.children.length > 1) && (
          <ListItemButton
            onClick={handleClick}
            sx={{ width: "fit-content", position: "absolute", right: 0 }}
          >
            {
              comment.replies.data.children.filter(
                (reply) => reply.data.author && reply.data.author.length !== 0
              ).length
            }{" "}
            Replies
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        )}
      </ListItem>
      <Divider />
      <Collapse in={open} timeout="auto" unmountOnExit>
        {comment.replies && (
          <List disablePadding sx={{ marginLeft: "30px" }}>
            {comment.replies.data.children
              .filter(
                (reply) => reply.data.author && reply.data.author.length !== 0
              )
              .map((reply) => (
                <Comment key={reply.data.id} comment={reply.data} />
              ))}
          </List>
        )}
      </Collapse>
    </>
  );
};

export default Comment;
