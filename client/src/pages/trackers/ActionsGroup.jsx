import React, { useCallback, useState } from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { IconButton } from "@mui/material";
import EntryDialog from "./EntryDialog";

const ActionsGroup = ({ data }) => {
  const [openEntryDialog, setOpenEntryDialog] = useState(false);
  const handleEdit = useCallback(() => {
    setOpenEntryDialog(true);
  }, []);

  console.log(data);
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
      <EntryDialog
        open={openEntryDialog}
        setOpen={setOpenEntryDialog}
        data={data}
        action="update"
      />
    </>
  );
};

export default ActionsGroup;
