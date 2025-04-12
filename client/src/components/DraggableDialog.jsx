import { Dialog, DialogTitle, Stack } from "@mui/material";
import React from "react";
import DraggablePaperComponent from "./DraggablePaperComponent";

const DraggableDialog = ({
  open,
  handleClose,
  title,
  closeButton,
  children,
}) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={DraggablePaperComponent}
        closeButton={closeButton}
        aria-labelledby="draggable-dialog"
      >
        <Stack direction="row" justifyContent="space-between">
          <DialogTitle
            id="#draggable-dialog-title"
            sx={{ textTransform: "capitalize" }}
          >
            {title}
          </DialogTitle>
          {closeButton}
        </Stack>
        {children}
      </Dialog>
    </>
  );
};

export default DraggableDialog;
