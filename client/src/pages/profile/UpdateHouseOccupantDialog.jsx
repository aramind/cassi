import React from "react";
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

const genderOptions = [
  { label: "male", value: "male" },
  { label: "female", value: "female" },
  { label: "non-binary", value: "nonBinary" },
  { label: "gender queer", value: "genderQueer" },
  { label: "gender fluid", value: "genderFluid" },
  { label: "agender", value: "agender" },
  { label: "prefer not to say", value: "preferNotToSay" },
];

const statusOptions = [
  { label: "active", value: "active" },
  { label: "suspended", value: "suspended" },
  { label: "evicted", value: "evicted" },
  { label: "banned", value: "banned" },
];

const UpdateHouseOccupantDialog = ({ open, setOpen, houseOccupantId }) => {
  const { handleOpen: handleConfirm, renderConfirmActionDialog } =
    useConfirmActionDialog();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const formMethods = {
    control,
    handleSubmit,
    errors,
  };

  //   handlers
  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  //   form handlers
  const handleClear = () => {
    reset();
  };

  const onSubmit = async (formData) => {
    alert("Submitting form...");
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

  console.log("HOCID", houseOccupantId);
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
                  name="name.firstName"
                />
                <ControlledLabelledTextField
                  label="middle name"
                  name="name.middleName"
                />
                <ControlledLabelledTextField
                  label="last name"
                  name="name.lastName"
                />
                <ControlledLabelledTextField label="nickname" name="nickName" />
                <ControlledLabelledTextField label="email" name="email" />
                <ControlledLabelledSelect
                  id="gender-select"
                  label="gender"
                  name="gender"
                  options={genderOptions}
                  defaultValue={genderOptions?.[-1]?.value}
                  styleProps={{ minWidth: "100px" }}
                />
                <ControlledLabelledTextField
                  label="birthday (mm/dd/yyyy)"
                  name="dateOfBirth"
                />
                <ControlledLabelledTextField
                  label="occupation"
                  name="occupation"
                />
                <ControlledLabelledTextField
                  label='preferences ( separate by " / " )'
                  name="preferences"
                />

                <LabelWrapper label="emergency contacts" />
                <Stack spacing={1} pl={2}>
                  <ControlledLabelledTextField
                    label="name"
                    name="emergencyContact.name"
                  />
                  <ControlledLabelledTextField
                    label="address"
                    name="emergencyContact.address"
                  />
                  <ControlledLabelledTextField
                    label="relation to occupant"
                    name="emergencyContact.relationToOccupant"
                  />
                  <ControlledLabelledTextField
                    label="relation to occupant"
                    name="emergencyContact.relationToOccupant"
                  />
                  <ControlledLabelledTextField
                    label="email"
                    name="emergencyContact.email"
                  />
                  <ControlledLabelledTextField
                    label="mobile number(s)"
                    name="emergencyContact.mobileNumber"
                  />
                  <ControlledLabelledTextField
                    label="phone number(s)"
                    name="emergencyContact.phoneNumber"
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
            Add
          </Button>
        </DialogActions>
      </Dialog>
      {renderConfirmActionDialog()}
    </>
  );
};

export default UpdateHouseOccupantDialog;
