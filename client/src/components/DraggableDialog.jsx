import { Dialog, DialogTitle } from "@mui/material";
import React from "react";
import DraggablePaperComponent from "./DraggablePaperComponent";

const DraggableDialog = ({ open, handleClose, title, children }) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={DraggablePaperComponent}
        aria-labelledby="draggable-dialog"
      >
        <DialogTitle
          id="#draggable-dialog-title"
          sx={{ textTransform: "capitalize" }}
        >
          {title}
        </DialogTitle>
        {children}
      </Dialog>
    </>
  );
};

export default DraggableDialog;
