import React, { useCallback, useState } from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { IconButton, Stack, Typography } from "@mui/material";
import EntryDialog from "./EntryDialog";
import useConfirmActionDialog from "../../hooks/useConfirmActionDialog";

const ActionsGroup = ({ data, submitHandler, deleteEntryHandler }) => {
  const [openEntryDialog, setOpenEntryDialog] = useState(false);
  const handleEdit = useCallback(() => {
    setOpenEntryDialog(true);
  }, []);

  const { handleOpen: handleConfirm, renderConfirmActionDialog } =
    useConfirmActionDialog();

  const handleConfirmDelete = () => {
    handleConfirm(
      "Confirm Delete",
      <Typography>Are you sure you want to delete this entry?</Typography>,
      () => deleteEntryHandler(data?._id)
    );
  };
  return (
    <>
      <IconButton aria-label="edit" onClick={handleEdit}>
        <EditRoundedIcon />
      </IconButton>
      <IconButton aria-label="delete" onClick={handleConfirmDelete}>
        <DeleteRoundedIcon />
      </IconButton>
      <EntryDialog
        open={openEntryDialog}
        setOpen={setOpenEntryDialog}
        data={data}
        action="update"
        submitHandler={submitHandler}
      />
      {renderConfirmActionDialog()}
    </>
  );
};

export default ActionsGroup;
