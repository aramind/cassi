import { ButtonBase, Stack, Typography } from "@mui/material";
import React from "react";

const Board = ({ text, onClickHandler, width, height, bgcolor }) => {
  return (
    <ButtonBase
      onClick={onClickHandler}
      sx={{ display: "block", width: width || "100%" }}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        role
        sx={{
          padding: 2,
          borderRadius: 6,
          height: width,
          bgcolor: (theme) =>
            theme.palette[bgcolor]?.light || theme.palette.primary.light,
          "&:hover": {
            backgroundColor: (theme) =>
              theme.palette[bgcolor]?.main || theme.palette.primary.main,
          },
        }}
      >
        <Typography
          variant="h4"
          width="100%"
          sx={{
            whiteSpace: "normal", // allows the text to wrap
            wordBreak: "break-word", // breaks long words if necessary
            overflowWrap: "break-word", // handles any overflow in long text
          }}
        >
          {text}
        </Typography>
      </Stack>
    </ButtonBase>
  );
};

export default Board;
