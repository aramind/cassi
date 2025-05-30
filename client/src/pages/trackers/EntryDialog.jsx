import React, { useEffect, useMemo, useState } from "react";
import useConfirmActionDialog from "../../hooks/useConfirmActionDialog";
import { useForm } from "react-hook-form";
import {
  Button,
  DialogActions,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";

import FormWrapper from "../../wrappers/FormWrapper";
import useAuth from "../../hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import addEntrySchema from "../../schemas/addEntrySchema";
import ControlledLabelledTextField from "../../components/controlled/ControlledLabelledTextField";
import ControlledLabelledSelect from "../../components/controlled/ControlledLabelledSelect";
import { DevTool } from "@hookform/devtools";
import DraggableDialog from "../../components/DraggableDialog";
import useApiGet from "../../hooks/api/useApiGet";
import LoadingPage from "../LoadingPage";
import ErrorPage from "../ErrorPage";
import useHouseReq from "../../hooks/api/authenticated/profile/useHouseReq";

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

const EntryDialog = ({
  open,
  action,
  data,
  submitHandler,
  handleCloseEntryDialog,
}) => {
  const [options, setOptions] = useState([]);
  const { getHouseProfile } = useHouseReq({ isPublic: false, showAck: false });
  const { auth } = useAuth();

  // values from props
  const tracker = data?.tracker;

  const {
    data: houseProfile,
    isLoading,
    isError,
  } = useApiGet("houseProfile", () => getHouseProfile(auth?.houseInfo?._id), {
    refetchOnWindowFocus: true,
    retry: 3,
    enabled: !!auth?.houseInfo?._id,
  });

  const { handleOpen: handleConfirm, renderConfirmActionDialog } =
    useConfirmActionDialog();

  useEffect(() => {
    const options = houseProfile?.data?.occupants
      ?.filter((ho) => ho?.status === "active")
      ?.map((ho) => {
        const label =
          ho.occupant?.name?.nickName || ho.occupant?.name?.firstName;
        return { label, value: ho?._id };
      });

    setOptions((pv) => [...options, { label: "UNASSIGNED", value: null }]);
  }, [houseProfile?.data?.occupants]);

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
  });

  const formMethods = {
    control,
    handleSubmit,
    errors,
  };

  useEffect(() => {
    const entryData = data?.entryData;

    if (entryData) {
      reset({
        ...entryData,
        originalAssignee: getOptionsValue(options, entryData?.originalAssignee),
        completedBy: getOptionsValue(options, entryData?.completedBy),
      });
    }
  }, [data?.entryData, options, reset]);

  // handlers
  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleCloseEntryDialog();
  };

  //   form handlers

  const onSubmit = async (formData) => {
    await submitHandler(tracker, formData);
    handleCloseEntryDialog();
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

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage />;

  return (
    <>
      <DraggableDialog open={open} onClose={handleClose} title={title}>
        <DialogContent>
          <FormWrapper formMethods={formMethods}>
            <form noValidate>
              <Stack spacing={1}>
                <ControlledLabelledTextField
                  label="date (mm/dd/yyyy)"
                  name="date"
                />
                <ControlledLabelledSelect
                  id="occupant-select"
                  label="assigned to"
                  name="originalAssignee"
                  options={options}
                  defaultValue={
                    data?.entryData
                      ? getOptionsValue(
                          options,
                          data?.entryData?.originalAssignee
                        )
                      : null
                  }
                />
                <ControlledLabelledSelect
                  id="occupant-select-completedBy"
                  label="completed by"
                  name="completedBy"
                  options={options}
                  defaultValue={
                    data?.entryData
                      ? getOptionsValue(options, data?.entryData?.completedBy)
                      : null
                  }
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
            {submitBtnText}
          </Button>
        </DialogActions>
        {/* <DevTool control={control} /> */}
      </DraggableDialog>
      {renderConfirmActionDialog()}
    </>
  );
};

export default EntryDialog;
