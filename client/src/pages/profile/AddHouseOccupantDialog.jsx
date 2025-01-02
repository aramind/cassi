import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";
import Draggable from "react-draggable";
import { useForm } from "react-hook-form";
import FormWrapper from "../../wrappers/FormWrapper";
import ControlledLabelledTextField from "../../components/controlled/ControlledLabelledTextField";
import ControlledLabelledSelect from "../../components/controlled/ControlledLabelledSelect";
import LabelWrapper from "../../wrappers/LabelWrapper";
import { DevTool } from "@hookform/devtools";
import DraggablePaperComponent from "../../components/DraggablePaperComponent";
import useConfirmActionDialog from "../../hooks/useConfirmActionDialog";

const genderOptions = [
  { label: "male", value: "male" },
  { label: "female", value: "female" },
  { label: "non-binary", value: "nonBinary" },
  { label: "gender queer", value: "genderQueer" },
  { label: "gender fluid", value: "genderFluid" },
  { label: "agender", value: "agender" },
  { label: "prefer not to say", value: "preferNotToSay" },
];

const AddHouseOccupantDialog = ({ open, setOpen }) => {
  // hooks
  const { handleOpen: handleConfirm, renderConfirmActionDialog } =
    useConfirmActionDialog();
  //   form related
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      gender: genderOptions[genderOptions?.length - 1]?.value,
    },
  });

  const formMethods = {
    control,
    handleSubmit,
    errors,
  };
  // handlers
  const handleClose = (e) => {
    e.stopPropagation();
  };

  // form handlers
  const handleClear = () => {
    reset();
  };

  const handleFormSubmit = (formData) => {
    alert("submitting form...");
    console.log(formData);
  };

  // confirm action dialog handlers
  const handleConfirmClear = () => {
    handleConfirm(
      "Confirm Clear",
      <Typography>Are you sure you want to reset all fields?</Typography>,
      handleClear
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
          Add new house occupant
        </DialogTitle>
        <DialogContent>
          <FormWrapper formMethods={formMethods}>
            <form noValidate>
              <Stack spacing={1}>
                <ControlledLabelledTextField
                  label="first name"
                  name="firstName"
                />
                <ControlledLabelledTextField
                  label="middle name"
                  name="middle"
                />
                <ControlledLabelledTextField
                  label="last name"
                  name="lastName"
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
          <Button className="outlined" onClick={handleConfirmClear}>
            Reset
          </Button>
          <Button
            className="contained"
            onClick={handleSubmit(handleFormSubmit)}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
      {renderConfirmActionDialog()}
    </>
  );
};

export default AddHouseOccupantDialog;
