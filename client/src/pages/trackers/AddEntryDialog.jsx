import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useConfirmActionDialog from "../../hooks/useConfirmActionDialog";
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
import { useForm } from "react-hook-form";
import ControlledLabelledTextField from "../../components/controlled/ControlledLabelledTextField";
import ControlledLabelledSelect from "../../components/controlled/ControlledLabelledSelect";
import { yupResolver } from "@hookform/resolvers/yup";
import addEntrySchema from "../../schemas/addEntrySchema";
import { DevTool } from "@hookform/devtools";
import useTrackerReq from "../../hooks/api/authenticated/useTrackerReq";
import useApiSend from "../../hooks/api/useApiSend";
import { convertToISOFormat } from "../../utils/date";
import useUpdateTracker from "../../hooks/api/authenticated/tracker/useUpdateTracker";

const AddEntryDialog = ({ open, setOpen, tracker }) => {
  const [options, setOptions] = useState([]);
  const { auth } = useAuth();
  const { sendUpdateTracker, isLoadingInUpdatingTracker } = useUpdateTracker();

  const { handleOpen: handleConfirm, renderConfirmActionDialog } =
    useConfirmActionDialog();

  useEffect(() => {
    const options = auth?.houseInfo?.houseOccupants?.map((ho) => {
      const label = ho.occupant?.name?.nickName || ho.occupant?.name?.firstName;
      return { label, value: ho?._id };
    });
    setOptions((pv) => options);
  }, [auth?.houseInfo?.houseOccupants]);

  // form-related
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(addEntrySchema),
  });

  const formMethods = {
    control,
    handleSubmit,
    errors,
  };

  // handlers
  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
  };

  //form handlers
  const onSubmit = async (formData) => {
    const formattedDate = convertToISOFormat(formData?.date);
    const newEntry = { ...formData, date: formattedDate };
    const updatedEntries = [newEntry, ...(tracker?.entries || [])];
    sendUpdateTracker({
      trackerId: tracker?._id,
      data: { entries: updatedEntries },
    });
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
      <Typography>Are you sure you want to add entry?</Typography>,
      handleSubmit(onSubmit)
    );
  };

  // if (isLoading) return <LoadingPage />;

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
          Add new entry
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
            Add
          </Button>
        </DialogActions>
      </Dialog>
      {renderConfirmActionDialog()}
      <DevTool control={control} />
    </>
  );
};

export default AddEntryDialog;
