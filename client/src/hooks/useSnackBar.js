import { Alert, Snackbar } from "@mui/material";
import React, { useCallback, useState } from "react";

const useSnackBar = () => {
  const [feedbackMsg, setFeedbackMsg] = useState({
    open: false,
    message: "",
    severity: "info",
    autoHideDuration: null,
  });

  const showFeedbackMessage = useCallback(
    (message, severity = "info", autoHideDuration = null) => {
      setFeedbackMsg({
        open: true,
        message,
        severity,
        autoHideDuration,
      });
    },
    []
  );

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setFeedbackMsg((prev) => ({ ...prev, open: false }));
  };

  const FeedbackMessage = (
    <Snackbar
      open={feedbackMsg.open}
      autoHideDuration={feedbackMsg.autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={feedbackMsg.severity}
        sx={{ width: "100%" }}
        variant="filled"
      >
        {feedbackMsg.message}
      </Alert>
    </Snackbar>
  );

  return { showFeedbackMessage, FeedbackMessage };
};

export default useSnackBar;
