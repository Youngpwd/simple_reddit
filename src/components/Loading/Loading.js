import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
        margin: "0 auto",
      }}
    >
      <Stack spacing={1}>
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="rectangular" width={300} height={210} />
        <Skeleton variant="rounded" width={300} height={50} />
      </Stack>
    </Box>
  );
};

export default Loading;
