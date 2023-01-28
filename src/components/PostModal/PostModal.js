import { Box, Modal } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPost,
  setPost,
  setPostOpen,
} from "../../features/PostSlice/PostSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PostModal = ({ open }) => {
  const dispatch = useDispatch();

  const post = useSelector(selectPost);

  const handleClose = () => {
    dispatch(setPostOpen(false));
    dispatch(setPost({}));
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <div>{post.title}</div>
      </Box>
    </Modal>
  );
};

export default PostModal;
