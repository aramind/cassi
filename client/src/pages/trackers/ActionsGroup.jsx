import React, { useCallback } from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { IconButton } from "@mui/material";

const ActionsGroup = React.memo(({ row }) => {
  const handleEdit = useCallback(() => {
    console.log(row);
    alert("editing...");
  });

  const handleDelete = useCallback(() => {
    alert("deleting...");
  });
  return (
    <>
      <IconButton aria-label="edit" onClick={handleEdit}>
        <EditRoundedIcon />
      </IconButton>
      <IconButton aria-label="delete" onClick={handleDelete}>
        <DeleteRoundedIcon />
      </IconButton>
    </>
  );
});

export default ActionsGroup;
