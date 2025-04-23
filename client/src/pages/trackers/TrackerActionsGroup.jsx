import React from "react";

import { IconButton, Stack } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
const TrackerActionsGroup = ({ updateHandler, deleteHandler, direction }) => {
  return (
    <Stack spacing={1} direction={direction}>
      <IconButton
        aria-label="edit"
        onClick={(e) => {
          e.stopPropagation();
          updateHandler();
        }}
        size="small"
      >
        <EditRoundedIcon />
      </IconButton>
      <IconButton
        aria-label="delete"
        onClick={(e) => {
          e.stopPropagation();
          deleteHandler();
        }}
        size="small"
      >
        <DeleteRoundedIcon />
      </IconButton>
    </Stack>
  );
};

export default TrackerActionsGroup;
