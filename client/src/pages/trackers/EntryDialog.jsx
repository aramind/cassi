import React, { useEffect, useState } from "react";
import useConfirmActionDialog from "../../hooks/useConfirmActionDialog";
import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import DraggablePaperComponent from "../../components/DraggablePaperComponent";
import FormWrapper from "../../wrappers/FormWrapper";
import useAuth from "../../hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import addEntrySchema from "../../schemas/addEntrySchema";
import ControlledLabelledTextField from "../../components/controlled/ControlledLabelledTextField";
import ControlledLabelledSelect from "../../components/controlled/ControlledLabelledSelect";
import { DevTool } from "@hookform/devtools";

const getTitle = (action) => {
  let title = "";

  switch (action) {
    case "add": {
      title = "Add New Entry";
      break;
    }
    case "update": {
      title = "Update Entry";
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
const getOptionsValue = (options, label) => {
  return options?.find((option) => option.label === label)?.value;
};

const EntryDialog = ({ open, setOpen, data, action }) => {
  const [options, setOptions] = useState([]);
  const { auth } = useAuth();

  const { handleOpen: handleConfirm, renderConfirmActionDialog } =
    useConfirmActionDialog();

  useEffect(() => {
    const options = auth?.houseInfo?.houseOccupants?.map((ho) => {
      const label = ho.occupant?.name?.nickName || ho.occupant?.name?.firstName;
      return { label, value: ho?._id };
    });
    setOptions((pv) => options);
  }, [auth?.houseInfo?.houseOccupants]);

  console.log(options);
  let title = getTitle(action);
  let submitBtnText = getSubmitBtnText(action);
  // form related
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(addEntrySchema),
    defaultValues: data,
  });

  const formMethods = {
    control,
    handleSubmit,
    errors,
  };

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        originalAssignee: getOptionsValue(options, data?.originalAssignee),
        completedBy: getOptionsValue(options, data?.completedBy),
      });
    }
  }, [data, options, reset]);
  // handlers
  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
  };

  //   form handlers

  const onSubmit = async (formData) => {
    console.log("sending", formData);
  };

  //   confirm action dialog handlers
  const handleConfirmClear = () => {
    handleConfirm(
      "Confirm Clear",
      <Typography>Are you sure you want to reset all fields?</Typography>,
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
          {title}
        </DialogTitle>
        <DialogContent>
          <FormWrapper formMethods={formMethods}>
            <form noValidate>
              <Stack spacing={1}>
                <ControlledLabelledTextField
                  label="date (mm/dd/yyy)"
                  name="date"
                />

                <ControlledLabelledSelect
                  id="occupant-select"
                  label="assigned to"
                  name="originalAssignee"
                  options={options}
                />
                <ControlledLabelledSelect
                  id="occupant-select-completedBy"
                  label="completed by"
                  name=" completedBy"
                  options={options}
                />
                <ControlledLabelledTextField
                  label='comments (separate by "/")'
                  name="comments"
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
            {getSubmitBtnText(action)}
          </Button>
        </DialogActions>
      </Dialog>
      {renderConfirmActionDialog()}
      <DevTool control={control} />
    </>
  );
};

export default EntryDialog;
