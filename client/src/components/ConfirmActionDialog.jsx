import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import React, { useRef } from "react";
import DraggablePaperComponent from "./DraggablePaperComponent";
import { red } from "@mui/material/colors";

const ConfirmActionDialog = ({
  open = false,
  setOpen,
  title = "",
  content = "",
  handleConfirm,
  maxWidth = "md",
}) => {
  const dialogRef = useRef(null);

  const handleClose = (e) => {
    e.stopPropagation();
  };

  return (
    <Dialog
      open={open || false}
      onClose={handleClose}
      PaperComponent={DraggablePaperComponent}
      PaperProps={{ ref: dialogRef }}
      maxWidth={maxWidth}
    >
      <DialogTitle id="draggable-dialog-title"> {title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Stack spacing={1} direction="row">
          <Button
            variant="outlined"
            color={red[200]}
            onClick={() => {
              setOpen(false);
            }}
          >
            cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleConfirm();
              setOpen(false);
            }}
          >
            confirm
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmActionDialog;
