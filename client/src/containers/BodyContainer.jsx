import { Box } from "@mui/material";
import React from "react";

const BodyContainer = ({ children }) => {
  return (
    <Box
      minHeight="100vh"
      minWidth="100vw"
      bgcolor={(theme) => theme.palette.myWhite.main}
      p={{ xs: 1, md: 2 }}
      className=" centered"
    >
      {children}
    </Box>
  );
};

export default BodyContainer;
