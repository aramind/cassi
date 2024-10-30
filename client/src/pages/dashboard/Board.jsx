import { ButtonBase, Stack, Typography } from "@mui/material";
import React from "react";

const Board = ({ text, onClickHandler, width }) => {
  return (
    <ButtonBase
      onClick={onClickHandler}
      sx={{ width: width || "100%", display: "block" }}
    >
      <Stack>
        <Typography variant="body1">{text}</Typography>
      </Stack>
    </ButtonBase>
  );
};

export default Board;
