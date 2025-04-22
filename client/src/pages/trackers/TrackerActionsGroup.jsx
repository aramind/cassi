import React, { useCallback, useState } from "react";
import useConfirmActionDialog from "../../hooks/useConfirmActionDialog";
import { IconButton, Stack, Typography } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import TrackerDialog from "./TrackerDialog";

const TrackerActionsGroup = ({ updateHandler, deleteHandler, direction }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleEdit = useCallback(() => {
    setOpenDialog(true);
  }, []);

  const { handleOpen: handleConfirm, renderConfirmActionDialog } =
    useConfirmActionDialog();

  // const handleDelete = () => {
  //   handleConfirm(
  //     "Confirm Delete",
  //     <Typography>
  //       Are you sure you want to proceed with the delete?
  //     </Typography>,
  //     () => deleteHandler({ status: "deleted" })
  //   );
  // };

  return (
    <Stack spacing={1} direction={direction}>
      <IconButton
        aria-label="edit"
        onClick={() => {
          handleEdit();
        }}
        size="small"
      >
        <EditRoundedIcon />
      </IconButton>
      <IconButton
        aria-label="delete"
        onClick={() => deleteHandler()}
        size="small"
      >
        <DeleteRoundedIcon />
      </IconButton>
      {/* <TrackerDialog
        open={openDialog}
        setOpen={setOpenDialog}
        data={tracker}
        action="update"
        submitHandler={updateHandler}
      /> */}
      {/* {renderConfirmActionDialog()} */}
    </Stack>
  );
};

export default TrackerActionsGroup;
