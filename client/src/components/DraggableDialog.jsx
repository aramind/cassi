import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";
import Draggable from "react-draggable";

const PaperComponent = (props) => {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={"[class*=*MuiDialogContent-root"}
    >
      <Paper {...props} sx={{ bgcolor: grey[100], width: "100%" }} />
    </Draggable>
  );
};
const DraggableDialog = ({ open, setOpen, title = "", content }) => {
  const [data, setData] = useState("");

  const handleClose = (e) => {
    e.stopPropagation();
  };

  const handleSendingData = () => {};

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog"
      >
        <DialogTitle id="draggable-dialog-title">{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button variant="outlined">cancel</Button>
          <Button variant="contained">save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DraggableDialog;
