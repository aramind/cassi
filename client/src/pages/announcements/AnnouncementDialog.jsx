import React, { useEffect } from "react";
import useConfirmActionDialog from "../../hooks/useConfirmActionDialog";
import { useForm } from "react-hook-form";
import {
  Button,
  DialogActions,
  DialogContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DraggableDialog from "../../components/DraggableDialog";
import FormWrapper from "../../wrappers/FormWrapper";
import ControlledLabelledTextField from "../../components/controlled/ControlledLabelledTextField";
import { DevTool } from "@hookform/devtools";
import ControlledLabelledSelect from "../../components/controlled/ControlledLabelledSelect";
import ControlledSlider from "../../components/controlled/ControlledSlider";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

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

const TYPE_OPTIONS = [
  {
    label: "general",
    value: "general",
  },
  {
    label: "reminder",
    value: "reminder",
  },
  {
    label: "rules",
    value: "rules",
  },
  {
    label: "emergency",
    value: "emergency",
  },
  {
    label: "maintenance",
    value: "maintenance",
  },
  {
    label: "inquiry",
    value: "inquiry",
  },
];

const AnnouncementDialog = ({
  open,
  setOpen,
  data,
  action,
  handleSaveAsDraft,
  submitHandler,
}) => {
  const { handleOpen: handleConfirm, renderConfirmActionDialog } =
    useConfirmActionDialog();

  // form related
  const defaultValues = action === "add" ? { type: "general" } : data || {};
  const {
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues,
  });

  const formMethods = {
    control,
    handleSubmit,
    errors,
  };

  useEffect(() => {
    if (action === "add") {
      setValue("type", "general", {
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  }, [action, setValue]);
  //   handlers
  const onSubmit = async (formData) => {
    console.log("SUBMITTING: ", formData);
    setOpen(false);
  };

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    reset();
    setOpen(false);
  };

  const handleConfirmClear = () => {
    handleConfirm(
      "Confirm Clear",
      <Typography>Are you sure you want to reset all fields</Typography>,
      () => reset()
    );
  };

  let title = getTitle(action);
  let submitBtnText = getSubmitBtnText(action);

  return (
    <>
      <DraggableDialog
        open={open}
        handleClose={handleClose}
        title={title}
        closeButton={
          <Button variant="text" onClick={handleClose} color="error">
            <CloseRoundedIcon />
          </Button>
        }
      >
        <DialogContent>
          <FormWrapper formMethods={formMethods}>
            <form noValidate>
              <Stack spacing={1}>
                <ControlledLabelledTextField
                  id="announcement-id"
                  label="title"
                  name="title"
                />
                <ControlledLabelledTextField
                  id="announcement-description"
                  label="content"
                  name="content"
                  multiline
                  tfProps={{ rows: 3 }}
                />
                <Stack direction="row" spacing={4}>
                  <ControlledLabelledSelect
                    id="announcement-type-select"
                    label="type"
                    name="type"
                    options={TYPE_OPTIONS}
                    defaultValue="general"
                  />
                  <ControlledSlider
                    name="importance"
                    label="importance"
                    isOptionsText={true}
                    textLevelOptions={["low", "medium", "high"]}
                  />
                </Stack>
              </Stack>
            </form>
          </FormWrapper>
        </DialogContent>
        <br />
        <DialogActions>
          {/* <Button size="small" onClick={handleClose}>
            Cancel
          </Button> */}
          <Button
            size="small"
            className="outlined"
            onClick={handleConfirmClear}
          >
            Reset
          </Button>
          <Button size="small" onClick={handleSaveAsDraft}>
            Save as Draft
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
      {renderConfirmActionDialog()}
      <DevTool control={control} />
    </>
  );
};

export default AnnouncementDialog;
