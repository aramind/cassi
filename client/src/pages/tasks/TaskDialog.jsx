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
import { formatToMMDDYYYY } from "../../utils/date";
import { dialogUtils } from "../../utils/dialogUtils";
import { Send } from "../../utils/muiIcons";

const getFormattedValues = (task) => {
  return {
    ...task,
    dueDate: formatToMMDDYYYY(task?.dueDate),
    remarks: task?.remarks?.join("/"),
  };
};

const initialValues = {
  title: "",
  description: "",
  importance: 0,
  type: TASK_CONSTANTS?.TYPE_OPTIONS[0]?.value || "",
  dueDate: "",
  isRecurring: false,
  recurrenceRule: TASK_CONSTANTS?.RECURRENCE_OPTIONS[0]?.value || "",
  remarks: "",
}

const TaskDialog = ({
  open,
  handleCloseDialog,
  data : task,
  action,
  submitHandler,
  clearHandler,
}) => {
  // form related

  //   TODO: add schema validator
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched", defaultValues: action === "update" && task ? getFormattedValues(task) : {
    title: "",
    description: "",
    importance: 0,
    type: TASK_CONSTANTS?.TYPE_OPTIONS[0]?.value || "",
    dueDate: "",
    isRecurring: false,
    recurrenceRule: TASK_CONSTANTS?.RECURRENCE_OPTIONS[0]?.value || "",
    remarks: "",
  } });

  const formMethods = {
    control,
    handleSubmit,
    errors,
  };

  useEffect(() => {
    if (task && action === "update") {
      reset(getFormattedValues(task));
    } else {
      reset(initialValues)
    }
  }, [task, reset, action]);

  //   handlers

  const onSubmit = async (formData) => {
    if (action === "add") {
      submitHandler(formData);
    } else if (action === "update" && task?._id) {
      await submitHandler({id: task?._id, updates: formData, needsToConfirm: true  });
      handleCloseDialog()
    }
  };
  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    reset();
    handleCloseDialog();
  };

  const isRecurringTrue = useWatch({ control, name: "isRecurring" });

  // console.log(task)
  return (
    <>
      <DraggableDialog
        open={open}
        handleClose={handleClose}
        title={dialogUtils?.getDialogTitle(action, "task")}
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
                <Box pr={4} pl={1}>
                  <ControlledSlider
                    id="task-importance"
                    name="importance"
                    label="importance"
                    isOptionsText={true}
                    textLevelOptions={["low", "medium", "high"]}
                  />
                </Box>
                <ControlledLabelledSelect
                  id="task-type-select"
                  label="type"
                  name="type"
                  options={TASK_CONSTANTS?.TYPE_OPTIONS}
                  defaultValue={TASK_CONSTANTS?.TYPE_OPTIONS[0]?.value}
                />
              </Stack>

              <ControlledLabelledTextField
                label="due date (mm/dd/yyy)"
                name="dueDate"
              />

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
                label='remarks (separate by "/")'
                name="remarks"
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
            endIcon={<Send />}
          >
            {action}
          </Button>
        </DialogActions>
      </DraggableDialog>
      <DevTool control={control} />
    </>
  );
};

export default TaskDialog;
