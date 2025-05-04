import React from "react";
import { useGlobalState } from "../../context/GlobalStatesProvider";
import { Alert, Snackbar } from "@mui/material";

const FeedbackNotif = () => {
  const {
    globalState: { alert },
    dispatch,
  } = useGlobalState();

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    dispatch({
      type: "SHOW_MINOR_ALERT",
      payload: { ...alert, open: false },
    });
  };

  return (
    <Snackbar
      open={alert.open}
      onClose={handleClose}
      autoHideDuration={alert.autoHideDuration}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{ zIndex: "999999" }}
    >
      <Alert
        severity={alert.severity}
        onClose={handleClose}
        sx={{ display: "flex", alignItems: "center" }}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default FeedbackNotif;
