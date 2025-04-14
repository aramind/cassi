import React, { useCallback, useState } from "react";
import useConfirmActionDialog from "../../hooks/useConfirmActionDialog";
import ActionButtons from "../../components/ActionButtons";
import { Typography } from "@mui/material";
import AnnouncementDialog from "./AnnouncementDialog";

const AnnounceActionsGroup = ({ data, updateHandler, deleteHandler }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleEdit = useCallback(() => {
    setOpenDialog(true);
  }, []);

  const { handleOpen: handleConfirm, renderConfirmActionDialog } =
    useConfirmActionDialog();

  const handleConfirmDelete = () => {
    handleConfirm(
      "Confirm Delete",
      <Typography>
        Are you sure you want to delete this announcement?
      </Typography>,
      () => deleteHandler()
    );
  };

  console.log(data);
  return (
    <>
      <ActionButtons
        size="small"
        direction="row"
        editHandler={handleEdit}
        deleteHandler={handleConfirmDelete}
      />
      <AnnouncementDialog
        open={openDialog}
        setOpen={setOpenDialog}
        data={data}
        action="update"
        submitHandler={updateHandler}
      />
      {renderConfirmActionDialog()}
    </>
  );
};

export default AnnounceActionsGroup;
