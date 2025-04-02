import React, { useCallback, useState } from "react";
import useConfirmActionDialog from "../../hooks/useConfirmActionDialog";
import { IconButton, Stack, Typography } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const TrackerActionsGroup = ({ tracker, updateHandler, deleteHandler }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleEdit = useCallback(() => {
    setOpenDialog(true);
  }, []);

  const { handleOpen: handleConfirm, renderConfirmActionDialog } =
    useConfirmActionDialog();

  const handleDelete = () => {
    handleConfirm(
      "Confirm Delete",
      <Typography>
        Are you sure you want to proceed with the delete?
      </Typography>,
      () => deleteHandler({ status: "deleted" })
    );
  };

  return (
    <Stack spacing={1}>
      <IconButton aria-label="edit" onClick={handleEdit}>
        <EditRoundedIcon />
      </IconButton>
      <IconButton aria-label="delete" onClick={handleDelete}>
        <DeleteRoundedIcon />
      </IconButton>

      {renderConfirmActionDialog()}
    </Stack>
  );
};

export default TrackerActionsGroup;
