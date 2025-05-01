import { Box, Typography } from "@mui/material";
import React from "react";
import AnimatedLoader from "../components/AnimatedLoader";

const LoadingPage = () => {
  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <AnimatedLoader />
      <Typography variant="h6" mt={4}>
        Loading, please wait...
      </Typography>
    </Box>
  );
};

export default LoadingPage;
