import React, { useEffect } from "react";

import useConfirmActionDialog from "../../hooks/useConfirmActionDialog";
import { useForm } from "react-hook-form";
import {
  Button,
  DialogActions,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";
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

const TrackerDialog = ({
  open,
  handleCloseDialog,
  data: tracker,
  action,
  submitHandler,
  clearHandler,
}) => {
  const { handleOpen: handleConfirm, renderConfirmActionDialog } =
    useConfirmActionDialog();

  // form related
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: action === "add" ? {} : tracker,
  });

  useEffect(() => {
    if (tracker && open) {
      reset(tracker);
    }
  }, [open, reset, tracker]);

  const formMethods = {
    control,
    handleSubmit,
    errors,
  };
  //   handlers
  const onSubmit = async (formData) => {
    if (action === "add") {
      submitHandler(formData);
    } else if (action === "update" && formData?._id) {
      await submitHandler(formData?._id, formData);
    }

    handleCloseDialog();
  };

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    reset();
    handleCloseDialog();
  };

  const handleConfirmClear = () => {
    handleConfirm(
      "Confirm Clear",
      <Typography>Are you sure you want to reset all fields</Typography>,
      () => reset()
    );
  };

  // const handleConfirmSubmit = () => {
  //   handleConfirm(
  //     "Confirm Submit",
  //     <Typography>Continue?</Typography>,
  //     handleSubmit(onSubmit)
  //   );
  // };

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
          <Button className="contained" onClick={handleSubmit(onSubmit)}>
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
