import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { options } from "../../constants/options";
import addNewOccupantSchema from "../../schemas/addNewOccupantSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { joinWithSymbol } from "../../utils/joinWithSymbol";
import { convertToISOFormat, formatToMMDDYYYY } from "../../utils/date";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { DevTool } from "@hookform/devtools";
import DraggablePaperComponent from "../../components/DraggablePaperComponent";
import FormWrapper from "../../wrappers/FormWrapper";
import ControlledLabelledTextField from "../../components/controlled/ControlledLabelledTextField";
import ControlledLabelledSelect from "../../components/controlled/ControlledLabelledSelect";
import LabelWrapper from "../../wrappers/LabelWrapper";
import useConfirmActionDialog from "../../hooks/useConfirmActionDialog";

const genderOptions = options?.gender;
const statusOptions = options?.homeOccupantStatus;
const initialValues = {
  gender: genderOptions[genderOptions?.length - 1]?.value,
};
const HouseOccupantDialog = ({
  open,
  handleCloseDialog,
  action,
  data,
  submitHandler,
}) => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(addNewOccupantSchema),
  });

  const formMethods = {
    control,
    handleSubmit,
    errors,
  };

  // hooks
  const { handleOpen: handleConfirm, renderConfirmActionDialog } =
    useConfirmActionDialog();

  useEffect(() => {
    if (action === "add") {
      reset(initialValues);
    }
  }, [action, reset]);

  useEffect(() => {
    if (data) {
      const { occupant, moveInDate, ...otherHouseOccupantInfo } = data;
      const { contactNumbers, dateOfBirth, preferences, ...otherOccupantInfo } =
        occupant;
      const formattedDefaultValues = {
        contactNumbers: joinWithSymbol(contactNumbers),
        preferences: joinWithSymbol(preferences),
        dateOfBirth: formatToMMDDYYYY(dateOfBirth),
        ...otherOccupantInfo,
        moveInDate: formatToMMDDYYYY(moveInDate),
        ...otherHouseOccupantInfo,
      };
      reset(formattedDefaultValues);
    }
  }, [data, reset]);

  // handlers
  const handleClose = (e) => {
    e.stopPropagation();
    handleCloseDialog();
  };

  //   form handlers
  const handleConfirmClear = () => {
    handleConfirm(
      "Confirm Clear",
      "Are you sure you want to reset all fields?",
      () => reset()
    );
  };

  const onSubmit = async (formData, id) => {
    if (action === "add") {
      const formattedFormData = {
        ...formData,
        dateOfBirth: formData?.dateOfBirth
          ? convertToISOFormat(formData?.dateOfBirth)
          : null,
        preferences: formData?.preferences?.split("/"),
        contactNumbers: formData?.contactNumbers?.split("/"),
      };
      submitHandler({ occupant: { occupant: formattedFormData } });
    } else if (action === "update") {
      //   submitHandler({ houseOccupantId: id, data: formData });
      // console.log(data);
      // console.log("UPDATING", formData);
      const { moveInDate, status, ...occupantData } = formData;
      console.log(occupantData);
      const formattedOccupantData = {
        ...occupantData,
        dateOfBirth: formData?.dateOfBirth
          ? convertToISOFormat(formData?.dateOfBirth)
          : null,
        preferences: occupantData?.preferences?.split("/"),
        contactNumbers: occupantData?.contactNumbers?.split("/"),
        _id: data?.occupant?._id,
      };

      const houseOccupantData = {
        _id: data?._id,
        status,
        moveInDate: convertToISOFormat(moveInDate),
        occupant: formattedOccupantData,
      };
      console.log(data);
      console.log(houseOccupantData);
      submitHandler({
        houseOccupantId: data?._id,
        data: houseOccupantData,
      });
    }
  };

  const title = action === "add" ? "Add new house occupant" : "Update Info";
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
              {action === "update" && (
                <Stack spacing={1} mb={2}>
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
              )}

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
                <ControlledLabelledTextField
                  label="nickname"
                  name="name.nickName"
                />
                <ControlledLabelledTextField label="email" name="email" />
                <ControlledLabelledTextField
                  label='contact number(s) ( separate by " / " )'
                  name="contactNumbers"
                />
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

                <LabelWrapper label="emergency contact" />
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
                    label="mobile number"
                    name="emergencyContact.mobileNumber"
                  />
                  <ControlledLabelledTextField
                    label="phone number"
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
          <Button className="contained" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {renderConfirmActionDialog()}
      <DevTool control={control} />
    </>
  );
};

export default HouseOccupantDialog;
