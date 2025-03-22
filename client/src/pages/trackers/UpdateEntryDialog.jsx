import React from "react";
import { useForm } from "react-hook-form";
import useConfirmActionDialog from "../../hooks/useConfirmActionDialog";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import DraggablePaperComponent from "../../components/DraggablePaperComponent";
import FormWrapper from "../../wrappers/FormWrapper";

const UpdateEntryDialog = ({ open, setOpen, data }) => {
  const { handleOpen: handleConfirm, renderConfirmActionDialog } =
    useConfirmActionDialog();

  // form related

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const formMethods = { control, handleSubmit, errors };

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
  };

  //   form handlers

  const onSubmit = async (formData) => {
    console.log("updating", formData);
  };

  const handleConfirmReset = () => {
    handleConfirm(
      "Confirm Reset",
      <Typography>Reset all fields?</Typography>,
      () => reset()
    );
  };
  const handleConfirmUpdate = () => {
    handleConfirm(
      "Confirm Update",
      <Typography>Continue?</Typography>,
      handleSubmit(onSubmit)
    );
  };

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
          Update Tracker
          {data?.date}
        </DialogTitle>
        <DialogContent>
          <FormWrapper formMethods={formMethods}>
            <form noValidate></form>
          </FormWrapper>
        </DialogContent>
      </Dialog>
      {renderConfirmActionDialog()}
    </>
  );
};

export default UpdateEntryDialog;
