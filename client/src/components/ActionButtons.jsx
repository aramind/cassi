import React from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { IconButton, Stack } from "@mui/material";

const ActionButtons = ({ size, direction, editHandler, deleteHandler }) => {
  return (
    <Stack direction={direction} size={size}>
      <IconButton aria-label="edit" onClick={editHandler}>
        <EditRoundedIcon />
      </IconButton>
      <IconButton aria-label="delete" onClick={deleteHandler}>
        <DeleteRoundedIcon />
      </IconButton>
    </Stack>
  );
};

export default ActionButtons;
