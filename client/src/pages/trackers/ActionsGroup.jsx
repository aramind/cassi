import React, { useCallback } from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { IconButton } from "@mui/material";

const ActionsGroup = ({ row }) => {
  const handleEdit = useCallback(() => {
    console.log(row);
    alert("editing...");
  }, [row]);

  const handleDelete = useCallback(() => {
    console.log(row);
    alert("deleting...");
  }, [row]);
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
};

export default ActionsGroup;
