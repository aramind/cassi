import React, { useCallback, useState } from "react";
import ConfirmActionDialog from "../components/ConfirmActionDialog";

const useConfirmActionDialog = (maxWidth) => {
  const [open, setOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState({
    title: "",
    content: "",
    confirmCallback: null,
  });

  const handleOpen = useCallback((title, content, confirmCallback) => {
    setDialogProps({
      title,
      content,
      confirmCallback,
    });
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  const handleConfirm = useCallback(() => {
    dialogProps.confirmCallback();
    setOpen(false);
  }, [dialogProps]);

  const renderConfirmActionDialog = useCallback(() => {
    return (
      <ConfirmActionDialog
        open={open || false}
        setOpen={setOpen}
        title={dialogProps.title}
        content={dialogProps.content}
        handleConfirm={handleConfirm}
        maxWidth={maxWidth}
      />
    );
  }, [dialogProps.content, dialogProps.title, handleConfirm, maxWidth, open]);

  return { handleOpen, handleClose, renderConfirmActionDialog };
};

export default useConfirmActionDialog;
