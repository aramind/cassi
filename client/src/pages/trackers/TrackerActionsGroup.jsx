import React, { useCallback, useState } from "react";
import useConfirmActionDialog from "../../hooks/useConfirmActionDialog";
import { IconButton, Typography } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const TrackerActionsGroup = ({ data, updateHandler, deleteHandler }) => {
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
      () => deleteHandler(data?._id)
    );
  };

  return (
    <>
      <IconButton aria-label="edit" onClick={handleEdit}>
        <EditRoundedIcon />
      </IconButton>
      <IconButton aria-label="delete" onClick={handleDelete}>
        <DeleteRoundedIcon />
      </IconButton>

      {renderConfirmActionDialog()}
    </>
  );
};

export default TrackerActionsGroup;
