import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import DraggableDialog from "../../components/DraggableDialog";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Stack,
} from "@mui/material";
import Xbutton from "../../components/buttons/Xbutton";
import FormWrapper from "../../wrappers/FormWrapper";
import ControlledLabelledTextField from "../../components/controlled/ControlledLabelledTextField";
import ControlledLabelledSelect from "../../components/controlled/ControlledLabelledSelect";
import { TASK_CONSTANTS } from "../../constants/tasks";
import ControlledSlider from "../../components/controlled/ControlledSlider";
import ControlledCheckBox from "../../components/controlled/ControlledCheckBox";
import { DevTool } from "@hookform/devtools";

const getTitle = (action) => {
  let title = "";

  switch (action) {
    case "add": {
      title = "Add New Task";
      break;
    }
    case "update": {
      title = "Update Task";
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

  const isRecurringTrue = useWatch({ control, name: "isRecurring" });
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
              <ControlledLabelledTextField
                id="task-title"
                label="title"
                name="title"
              />
              <ControlledLabelledTextField
                id="task-description"
                label="description"
                name="description"
                multiline
                tfProps={{ rows: 2 }}
              />
              <Stack direction="row" spacing={1} justifyContent="space-between">
                <ControlledLabelledSelect
                  id="task-type-select"
                  label="type"
                  name="type"
                  options={TASK_CONSTANTS?.TYPE_OPTIONS}
                  defaultValue={TASK_CONSTANTS?.TYPE_OPTIONS[0]?.value}
                />
                <ControlledLabelledSelect
                  id="task-status-select"
                  label="status"
                  name="status"
                  options={TASK_CONSTANTS?.STATUS_OPTIONS}
                  defaultValue={TASK_CONSTANTS?.STATUS_OPTIONS[0]?.value}
                />
              </Stack>
              <Stack direction="row" spacing={1} justifyContent="space-between">
                <Box pr={4} pl={1}>
                  <ControlledSlider
                    id="task-importance"
                    name="importance"
                    label="importance"
                    isOptionsText={true}
                    textLevelOptions={["low", "medium", "high"]}
                  />
                </Box>
                <Box sx={{ flexShrink: 1, minWidth: 0 }}>
                  <ControlledLabelledTextField
                    label="due date (mm/dd/yyy)"
                    name="dueDate"
                  />
                </Box>
              </Stack>
              <Stack spacing={1} direction="row" justifyContent="flex-start">
                <ControlledCheckBox
                  name="isRecurring"
                  label="Recurring Task?"
                />
                {isRecurringTrue && (
                  <ControlledLabelledSelect
                    id="task-recurrenceRule-select"
                    label="repeats every"
                    name="recurrenceRule"
                    options={TASK_CONSTANTS?.RECURRENCE_OPTIONS}
                    defaultValue={TASK_CONSTANTS?.RECURRENCE_OPTIONS[0]?.value}
                  />
                )}
              </Stack>
              <ControlledLabelledTextField
                label='comments (separate by "/")'
                name="comments"
              />
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
      <DevTool control={control} />
    </>
  );
};

export default TaskDialog;
