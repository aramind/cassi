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
import ControlledLabelledTextField from "../../components/controlled/ControlledLabelledTextField";
import ControlledLabelledSelect from "../../components/controlled/ControlledLabelledSelect";
import LabelWrapper from "../../wrappers/LabelWrapper";
import useApiGet from "../../hooks/api/useApiGet";
import useAuth from "../../hooks/useAuth";
import LoadingPage from "../LoadingPage";
import ErrorPage from "../ErrorPage";
import { joinWithSymbol } from "../../utils/joinWithSymbol";
import { options } from "../../constants/options";
import { formatToMMDDYYYY } from "../../utils/date";

const genderOptions = options?.gender;

const statusOptions = options?.homeOccupantStatus;

const UpdateHouseOccupantDialog = ({
  open,
  setOpen,
  data,
  houseOccupantId,
  sendUpdateRequest,
}) => {
  const { auth } = useAuth();
  const [defaultValues, setDefaultValues] = useState({});
  const { handleOpen: handleConfirm, renderConfirmActionDialog } =
    useConfirmActionDialog();

  // const { getHouseOccupant } = useHouseOccupantReq({
  //   isPublic: false,
  //   showAck: false,
  // });

  // const {
  //   data: houseOccupantData,
  //   isLoading,
  //   isError,
  // } = useApiGet("house-occupant", () => getHouseOccupant(houseOccupantId), {
  //   refetchOnWindowFocus: true,
  //   retry: 3,
  //   enabled: !!auth?.houseInfo?._id,
  // });

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched", defaultValues: defaultValues });

  const formMethods = {
    control,
    handleSubmit,
    errors,
  };

  useEffect(() => {
    if (data) {
      const { occupant, moveInDate, ...otherHouseOccupantInfo } = data;
      const { contactNumbers, dateOfBirth, ...otherOccupantInfo } = occupant;
      const formattedDefaultValues = {
        occupant: {
          contactNumbers: joinWithSymbol(contactNumbers),
          dateOfBirth: formatToMMDDYYYY(dateOfBirth),
          ...otherOccupantInfo,
        },
        moveInDate: formatToMMDDYYYY(moveInDate),
        ...otherHouseOccupantInfo,
      };
      setDefaultValues((pv) => formattedDefaultValues);
      reset(formattedDefaultValues);
    }
  }, [data, reset, setDefaultValues]);

  //   handlers
  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  //   form handlers
  const handleClear = () => {
    reset(defaultValues);
  };

  const onSubmit = async (formData) => {
    await handleSubmit(
      sendUpdateRequest({ houseOccupantId: houseOccupantId, data: formData })
    );
    setOpen(false);
  };

  const handleFormSubmit = () => {
    handleSubmit(onSubmit)();
  };

  const handleConfirmClear = () => {
    handleConfirm(
      "Confirm Clear",
      <Typography>Are you sure you want to reset all fields?</Typography>,
      handleClear
    );
  };

  const handleConfirmSubmit = () => {
    handleConfirm(
      "Confirm Submit",
      <Typography>Save and submit changes?</Typography>,
      handleFormSubmit
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
          Update House Occupant
        </DialogTitle>
        <DialogContent>
          <FormWrapper formMethods={formMethods}>
            <form noValidate>
              <Stack spacing={1}>
                <ControlledLabelledTextField
                  label="move-in-date (mm/dd/yyyy)"
                  name="moveInDate"
                />
                <ControlledLabelledSelect
                  id="status-select"
                  label="status"
                  name="status"
                  options={statusOptions}
                  defaultValue={statusOptions?.[0]?.value}
                  styleProps={{ minWidth: "100px" }}
                />
              </Stack>
              <br />
              <Typography sx={{ textTransform: "uppercase" }}>
                Personal Information
              </Typography>
              <br />
              <Stack spacing={1}>
                <ControlledLabelledTextField
                  label="first name"
                  name="occupant.name.firstName"
                />
                <ControlledLabelledTextField
                  label="middle name"
                  name="occupant.name.middleName"
                />
                <ControlledLabelledTextField
                  label="last name"
                  name="occupant.name.lastName"
                />
                <ControlledLabelledTextField
                  label="nickname"
                  name="occupant.name.nickName"
                />
                <ControlledLabelledTextField
                  label="email"
                  name="occupant.email"
                />
                <ControlledLabelledSelect
                  id="gender-select"
                  label="gender"
                  name="occupant.gender"
                  options={genderOptions}
                  styleProps={{ minWidth: "100px" }}
                />
                <ControlledLabelledTextField
                  label="birthday (mm/dd/yyyy)"
                  name="occupant.dateOfBirth"
                />
                <ControlledLabelledTextField
                  label="occupation"
                  name="occupant.occupation"
                />
                <ControlledLabelledTextField
                  label='preferences ( separate by " / " )'
                  name="occupant.preferences"
                />

                <LabelWrapper label="emergency contacts" />
                <Stack spacing={1} pl={2}>
                  <ControlledLabelledTextField
                    label="name"
                    name="occupant.emergencyContact.name"
                  />
                  <ControlledLabelledTextField
                    label="address"
                    name="occupant.emergencyContact.address"
                  />
                  <ControlledLabelledTextField
                    label="relation to occupant"
                    name="occupant.emergencyContact.relationToOccupant"
                  />
                  <ControlledLabelledTextField
                    label="relation to occupant"
                    name="occupant.emergencyContact.relationToOccupant"
                  />
                  <ControlledLabelledTextField
                    label="email"
                    name="occupant.emergencyContact.email"
                  />
                  <ControlledLabelledTextField
                    label="mobile number(s)"
                    name="emergencyContact.mobileNumber"
                  />
                  <ControlledLabelledTextField
                    label="phone number(s)"
                    name="occupant.emergencyContact.phoneNumber"
                  />
                </Stack>
              </Stack>
              {/* <DevTool control={control} /> */}
            </form>
          </FormWrapper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button className="outlined" onClick={handleConfirmClear}>
            Reset
          </Button>
          <Button className="contained" onClick={handleConfirmSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {renderConfirmActionDialog()}
    </>
  );
};

export default UpdateHouseOccupantDialog;
