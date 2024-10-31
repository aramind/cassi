import { Typography } from "@mui/material";
import React from "react";

const PageHeader = ({ text }) => {
  return (
    <Typography variant="h5" textTransform="capitalize">
      {text}
    </Typography>
  );
};

export default PageHeader;
