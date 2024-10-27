import { Stack, Typography } from "@mui/material";
import React from "react";

const TextFieldError = ({ errorMessage }) => {
  return (
    <Stack sx={{ minHeight: "1.5rem" }} alignItems="flex-start" px={1}>
      <Typography
        variant="caption"
        sx={{
          fontSize: "0.6rem",
          color: (theme) => theme.palette.notification?.error?.main,
        }}
        width={1}
        textAlign="end"
      >
        {errorMessage || ""}
      </Typography>
    </Stack>
  );
};

export default TextFieldError;
