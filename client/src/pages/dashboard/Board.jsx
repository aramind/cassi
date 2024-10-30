import { Stack, Typography } from "@mui/material";
import React from "react";

const Board = ({ text }) => {
  return (
    <Stack>
      <Typography variant="body1">{text}</Typography>
    </Stack>
  );
};

export default Board;
