import {
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";
import Draggable from "react-draggable";
import { Controller, useForm } from "react-hook-form";
import FormWrapper from "../../wrappers/FormWrapper";
import ControlledLabelledTextField from "../../components/controlled/ControlledLabelledTextField";
import ControlledLabelledSelect from "../../components/controlled/ControlledLabelledSelect";
import ReusableSelect from "../../components/ReusableSelect";
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
const PaperComponent = (props) => {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={"[class*=*MuiDialogContent-root]"}
    >
      <Paper {...props} sx={{ bgcolor: grey[100], width: "100%" }} />
    </Draggable>
  );
};
const AddHouseOccupantDialog = ({ open, setOpen }) => {
  const [data, setData] = useState("");

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

  const handleSendingData = () => {
    alert("Sending data");
  };

  const handleFormSubmit = () => {
    alert("submitting form...");
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
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
              </Stack>
            </form>
          </FormWrapper>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddHouseOccupantDialog;
