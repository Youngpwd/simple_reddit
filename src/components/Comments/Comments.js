import { useSelector } from "react-redux";
import { selectComments } from "../../features/PostSlice/PostSlice";
import { List, useMediaQuery } from "@mui/material";
import Comment from "./Comment";
import { useTheme } from "@mui/material/styles";

const Comments = () => {
  const comments = useSelector(selectComments);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

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
          return <Comment key={comment.id} comment={comment} breakPointUp={matches} />;
        })}
    </List>
  );
};

export default Comments;
