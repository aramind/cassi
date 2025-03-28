import React from "react";
import useAuth from "../../hooks/useAuth";
import useConfirmActionDialog from "../../hooks/useConfirmActionDialog";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, Stack, Typography } from "@mui/material";
import DraggablePaperComponent from "../../components/DraggablePaperComponent";
import DraggableDialog from "../../components/DraggableDialog";
import FormWrapper from "../../wrappers/FormWrapper";
import ControlledLabelledTextField from "../../components/controlled/ControlledLabelledTextField";

const TrackerDialog = ({ open, setOpen, data, action, submitHandler }) => {
  const { auth } = useAuth();

  const { handleOpen: handleConfirm, renderConfirmActionDialog } =
    useConfirmActionDialog();

  // form related
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched", defaultValues: data || {} });

  const formMethods = {
    control,
    handleSubmit,
    errors,
  };
  //   handlers
  const onSubmit = async (formData) => {
    submitHandler(formData);
  };

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
  };

  const handleConfirmClear = () => {
    handleConfirm(
      "Confirm Clear",
      <Typography>Are you sure you want to reset all fields</Typography>,
      () => reset()
    );
  };

  const handleConfirmSubmit = () => {
    handleConfirm(
      "Confirm Submit",
      <Typography>Continue?</Typography>,
      handleSubmit(onSubmit)
    );
  };

  return (
    <>
      <DraggableDialog
        open={setOpen}
        handleClose={handleClose}
        title="add tracker"
      >
        <DialogContent>
          <FormWrapper formMethods={formMethods}>
            <form noValidate>
              <Stack spacing={1}>
                <ControlledLabelledTextField
                  id="tracker-id"
                  label="title"
                  name="title"
                />
                <ControlledLabelledTextField
                  id="tracker-description"
                  label="description"
                  name="description"
                  multiline
                  tfProps={{ rows: 4 }}
                />
              </Stack>
            </form>
          </FormWrapper>
        </DialogContent>
      </DraggableDialog>
      {renderConfirmActionDialog}
    </>
  );
};

export default TrackerDialog;
