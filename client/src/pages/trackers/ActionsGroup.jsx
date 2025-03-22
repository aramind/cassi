import React, { useCallback, useState } from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { IconButton } from "@mui/material";
import UpdateEntryDialog from "./UpdateEntryDialog";

const ActionsGroup = ({ row }) => {
  const [openUpdateEntryDialog, setOpenUpdateEntryDialog] = useState(false);
  const handleEdit = useCallback(() => {
    setOpenUpdateEntryDialog(true);
  }, []);

  console.log(row?.date);
  const handleDelete = useCallback(() => {
    alert("deleting...");
  }, []);
  return (
    <>
      <IconButton aria-label="edit" onClick={handleEdit}>
        <EditRoundedIcon />
      </IconButton>
      <IconButton aria-label="delete" onClick={handleDelete}>
        <DeleteRoundedIcon />
      </IconButton>
      <UpdateEntryDialog
        open={openUpdateEntryDialog}
        setOpen={setOpenUpdateEntryDialog}
        data={row}
      />
    </>
  );
};

export default ActionsGroup;
