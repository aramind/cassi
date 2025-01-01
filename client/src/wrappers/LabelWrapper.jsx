import { InputLabel, Stack } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";

const getErrorLabel = (hasError, error) => {
  if (!hasError) return "";
  if (error === "Required") return "";
  else {
    const formattedError = `>> ${error}`;
    return formattedError.toUpperCase();
  }
};
const LabelWrapper = ({ children, id, label, hasError, error }) => {
  return (
    <Stack width={1} gap={0.25}>
      <InputLabel
        htmlFor={id}
        sx={{
          color: hasError && hasErrorStyles,
          "&.MuiFormatLabel-root": {
            fontSize: "0.8rem",
          },
        }}
      >
        {label.toUpperCase() + " " + getErrorLabel(hasError, error)}
      </InputLabel>
      {children}
    </Stack>
  );
};

export default LabelWrapper;

const hasErrorStyles = {
  color: red[500],
};
