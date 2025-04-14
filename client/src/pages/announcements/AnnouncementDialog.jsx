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
import ControlledLabelledSelect from "../../components/controlled/ControlledLabelledSelect";
import ControlledSlider from "../../components/controlled/ControlledSlider";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { yupResolver } from "@hookform/resolvers/yup";
import newAnnouncementSchema from "../../schemas/newAnnouncementSchema";
import useHouseProvider from "../../hooks/useHouseProvider";

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
  const { activeOccupantOptions } = useHouseProvider();

  // form related
  const defaultValues = data && data;
  const {
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues,
    resolver: yupResolver(newAnnouncementSchema),
  });

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
  useEffect(() => {
    if (action === "add") {
      setValue("type", "general", {
        shouldTouch: true,
        shouldValidate: true,
      });
      setValue("importance", "low", {
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  }, [action, setValue]);

  //   handlers
  const onSubmit = async (formData) => {
    if (action === "add") {
      submitHandler({ ...formData, status: "published" });
    } else if (action === "update") {
      submitHandler({ id: data?._id, data: formData });
    }
    console.log(formData);
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
      () => reset(data && {})
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
                <ControlledLabelledSelect
                  id="occupant-select-createdBy"
                  label="creator"
                  name="createdBy"
                  options={activeOccupantOptions}
                  defaultValue={activeOccupantOptions[0]?.value}
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
              </Stack>
            </form>
            <DevTool control={control} />
          </FormWrapper>
        </DialogContent>
        <br />
        <DialogActions>
          {/* <Button size="small" onClick={handleClose}>
            Cancel
          </Button> */}
          <Button size="small" variant="outlined" onClick={handleConfirmClear}>
            Reset
          </Button>
          <Button size="small" variant="outlined" onClick={handleSaveAsDraft}>
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
    </>
  );
};

export default AnnouncementDialog;
