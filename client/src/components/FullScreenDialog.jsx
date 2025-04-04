import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { cloneElement } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = ({
  open = false,
  setOpen,
  actionButton,
  title,
  children,
  actionText,
}) => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {actionButton ? (
        cloneElement(actionButton, { onClick: handleClickOpen })
      ) : (
        <Button variant="outlined" onClick={handleClickOpen}>
          {actionText}
        </Button>
      )}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flex: 1 }}>
              {title.toUpperCase()}
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseRoundedIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {children}
      </Dialog>
    </>
  );
};

export default FullScreenDialog;
