import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";

const ErrorPage = ({ error }) => {
  const navigate = useNavigate();
  useEffect(() => {
   const redirect = setTimeout(() => {
       navigate("/");
    }, 5000);
    return () => clearTimeout(redirect);
  });


  return (
    <div>
      <Typography variant="h5" color="error">
        Sorry, there was an error: {error}
      </Typography>
    </div>
  );
};

export default ErrorPage;
