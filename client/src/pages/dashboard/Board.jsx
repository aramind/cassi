import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import React from "react";

const Board = ({
  text,
  icon,
  onClickHandler,
  width,
  height,
  bgcolor,
  iconColor,
}) => {
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
          "& .icon-wrapper": {
            color: "secondary.dark",
          },
          "&:hover": {
            backgroundColor: (theme) =>
              theme.palette.primary.dark ||
              theme.palette[bgcolor]?.main ||
              theme.palette.primary.main,
            "& .icon-wrapper": {
              color: "secondary.light",
            },
            "& .text-wrapper": {
              color: "secondary.light",
            },
          },
        }}
      >
        <Box sx={{ fontSize: "4rem" }} className="icon-wrapper " height="auto">
          {React.cloneElement(icon, {
            sx: {
              fontSize: { xs: "2rem", md: "4rem" },
              color: "inherit",
            },
          })}
        </Box>
        <Typography
          className="text-wrapper"
          variant="h6"
          width="100%"
          sx={{
            whiteSpace: "normal", // allows the text to wrap
            wordBreak: "break-word", // breaks long words if necessary
            overflowWrap: "break-word", // handles any overflow in long text
          }}
        >
          {text.toUpperCase()}
        </Typography>
      </Stack>
    </ButtonBase>
  );
};

export default Board;
