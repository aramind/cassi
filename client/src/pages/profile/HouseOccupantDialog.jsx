import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { options } from "../../constants/options";
import addNewOccupantSchema from "../../schemas/addNewOccupantSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { joinWithSymbol } from "../../utils/joinWithSymbol";
import { formatToMMDDYYYY } from "../../utils/date";
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
import useConfirmActionDialog from "../../hooks/useConfirmActionDialog";

const genderOptions = options?.gender;
const statusOptions = options?.homeOccupantStatus;
const HouseOccupantDialog = ({
  open,
  handleCloseDialog,
  action,
  data,
  submitHandler,
}) => {
  const [defaultValues, setDefaultValues] = useState({ ...data });
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: defaultValues || {
      gender: genderOptions[genderOptions?.length - 1]?.value,
    },
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
      submitHandler({ occupant: { occupant: formData } });
    } else if (action === "update") {
      submitHandler({ houseOccupantId: id, data: formData });
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
          <Button className="contained" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {renderConfirmActionDialog()}
    </>
  );
};

export default HouseOccupantDialog;
