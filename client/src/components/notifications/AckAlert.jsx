import React from "react";
import { useGlobalState } from "../../context/GlobalStatesProvider";
import { Alert, Snackbar } from "@mui/material";

function AckAlert() {
  const {
    globalState: { ackAlert },
    dispatch,
  } = useGlobalState();

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    dispatch({
      type: "SHOW_ACK_ALERT",
      payload: { ...ackAlert, open: false },
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
        className="outlined"
        sx={{ display: "flex", alignItems: "center" }}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
}

export default AckAlert;
