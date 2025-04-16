import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import DraggableDialog from "../../components/DraggableDialog";
import {
  Button,
  DialogActions,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";
import Xbutton from "../../components/buttons/Xbutton";
import FormWrapper from "../../wrappers/FormWrapper";

const getTitle = (action) => {
  let title = "";

  switch (action) {
    case "add": {
      title = "Add New Announcement";
      break;
    }
    case "update": {
      title = "Update Announcement";
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

const TaskDialog = ({
  open,
  setOpen,
  data,
  action,
  saveAsDraftHandler,
  publishHandler,
  submitHandler,
  clearHandler,
}) => {
  // form related

  const defaultValues = data && {};

  //   TODO: add schema validator
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched", defaultValues });

  const formMethods = {
    control,
    handleSubmit,
    errors,
  };

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  //   hanlders

  const onSubmit = async (formData) => {
    if (action === "add") {
      submitHandler();
    } else if (action === "update") {
      submitHandler();
    }
    setOpen(false);
  };
  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    reset();
    setOpen(false);
  };

  let title = getTitle(action);
  let submitBtnText = getSubmitBtnText(action);
  return (
    <>
      <DraggableDialog
        open={open}
        handleClose={handleClose}
        title={title}
        closeButton={<Xbutton handleClose={handleClose} />}
      >
        <DialogContent>
          <FormWrapper formMethods={formMethods}>
            <Stack spacing={1}>
              <Typography>Fields here...</Typography>
            </Stack>
          </FormWrapper>
        </DialogContent>
        <br />
        <DialogActions>
          <Button size="small" variant="outlined" onClick={clearHandler}>
            Reset
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            {submitBtnText}
          </Button>
        </DialogActions>
      </DraggableDialog>
    </>
  );
};

export default TaskDialog;
