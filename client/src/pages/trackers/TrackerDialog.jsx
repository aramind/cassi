import React from "react";
import useAuth from "../../hooks/useAuth";
import useConfirmActionDialog from "../../hooks/useConfirmActionDialog";
import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";
import DraggablePaperComponent from "../../components/DraggablePaperComponent";
import DraggableDialog from "../../components/DraggableDialog";
import FormWrapper from "../../wrappers/FormWrapper";
import ControlledLabelledTextField from "../../components/controlled/ControlledLabelledTextField";
import { DevTool } from "@hookform/devtools";

const getTitle = (action) => {
  let title = "";

  switch (action) {
    case "add": {
      title = "Add New Tracker";
      break;
    }
    case "update": {
      title = "Update Tracker";
      break;
    }
    default:
      title = "";
  }

  return title;
};

const getSubmitBtnText = (action) => {
  let text = "";

  switch (action) {
    case "add": {
      text = "Submit";
      break;
    }
    case "update": {
      text = "Update";
      break;
    }
    default:
      text = "";
  }

  return text;
};

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

  let title = getTitle(action);
  let submitBtnText = getSubmitBtnText(action);

  return (
    <>
      <DraggableDialog open={open} handleClose={handleClose} title={title}>
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
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button className="outlined" onClick={handleConfirmClear}>
            Reset
          </Button>
          <Button className="contained" onClick={handleConfirmSubmit}>
            {submitBtnText}
          </Button>
        </DialogActions>
      </DraggableDialog>
      {renderConfirmActionDialog()}
      <DevTool control={control} />
    </>
  );
};

export default TrackerDialog;
