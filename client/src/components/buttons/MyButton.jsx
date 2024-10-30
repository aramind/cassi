import { Button } from "@mui/material";
import React from "react";

const MyButton = ({
  type,
  text,
  variant,
  width = "10rem",
  otherProps,
  onClickHandler,

  btnProps,
}) => {
  return (
    <Button
      variant={variant}
      onClick={() => onClickHandler()}
      {...btnProps}
      sx={{
        bgcolor: (theme) =>
          theme.palette[type]?.main || theme.palette.primary.main,
        width: width,
        ...otherProps,
        ":hover": {
          bgcolor: (theme) =>
            theme.palette[type]?.dark || theme.palette.primary.dark,
        },
      }}
    >
      {text}
    </Button>
  );
};

export default MyButton;
