import { useSelector } from "react-redux";
import { selectComments } from "../../features/PostSlice/PostSlice";
import { List } from "@mui/material";
import Comment from "./Comment";

const Comments = () => {
  const comments = useSelector(selectComments);

  return (
    <List sx={{ width: "100" }}>
      {comments
        .filter(
          (comment) =>
            comment.distinguished !== "moderator" &&
            comment.author &&
            comment.author.length !== 0
        )
        .map((comment) => {
          return <Comment key={comment.id} comment={comment} />;
        })}
    </List>
  );
};

export default Comments;
