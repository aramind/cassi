import { Box } from "@mui/material";
import React from "react";

const CenteredBox = ({ children }) => {
  return (
    <Box
      width={1}
      textAlign="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </Box>
  );
};

export default CenteredBox;
