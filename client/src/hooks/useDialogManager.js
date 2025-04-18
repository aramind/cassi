import { useState } from "react";

const useDialogManager = () => {
  const [dialogState, setDialogState] = useState({
    open: false,
    action: "",
    data: null,
  });

  const openDialog = (action, data) => {
    setDialogState({ open: true, action, data });
  };

  const closeDialog = () => {
    setDialogState({ open: false, action: "", data: null });
  };

  return {
    dialogState,
    openDialog,
    closeDialog,
  };
};

export default useDialogManager;
