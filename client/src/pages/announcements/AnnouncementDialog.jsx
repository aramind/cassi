import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, DialogActions, DialogContent, Stack } from "@mui/material";
import DraggableDialog from "../../components/DraggableDialog";
import FormWrapper from "../../wrappers/FormWrapper";
import ControlledLabelledTextField from "../../components/controlled/ControlledLabelledTextField";
import { DevTool } from "@hookform/devtools";
import ControlledLabelledSelect from "../../components/controlled/ControlledLabelledSelect";
import ControlledSlider from "../../components/controlled/ControlledSlider";
import { yupResolver } from "@hookform/resolvers/yup";
import newAnnouncementSchema from "../../schemas/newAnnouncementSchema";
import useHouseProvider from "../../hooks/useHouseProvider";
import Xbutton from "../../components/buttons/Xbutton";
import {
  actionButtonText,
  dialogTitle,
  TYPE_OPTIONS,
} from "../../utils/announcementUtils";
import useFormActions from "../../hooks/useFormActions";

const AnnouncementDialog = ({
  open,
  handleCloseDialog,
  action,
  data,
  submitHandler,
  handleConfirmSaveAsDraft,
  handleConfirmPublish,
}) => {
  const { activeOccupantOptions } = useHouseProvider();
  const { handleConfirmReset, handleClear, renderConfirmDialog } =
    useFormActions();

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
      reset({});
      setValue("type", "general", {
        shouldTouch: true,
        shouldValidate: true,
      });
      setValue("importance", "low", {
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  }, [action, reset, setValue]);

  //   handlers
  const onSubmit = async (formData) => {
    if (action === "add") {
      submitHandler({ ...formData, status: "published" });
    } else if (action === "update") {
      submitHandler({ id: data?._id, data: formData });
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    reset();
    handleCloseDialog();
  };

  const onSaveAsDraft = async (formData) => {
    if (action === "add") {
      submitHandler({ ...formData, status: "draft" });
    } else {
      handleConfirmSaveAsDraft({
        id: data?._id,
        data: { ...formData, status: "draft" },
      });
    }
  };

  const onPublish = async (formData) => {
    handleConfirmPublish({
      id: data?._id,
      data: { ...formData, status: "published" },
    });
  };

  const onClear = () => handleClear(reset, { title: "", content: "" });

  const onReset = () => handleConfirmReset(reset, data);
  return (
    <>
      <DraggableDialog
        open={open}
        handleClose={handleClose}
        title={dialogTitle?.[action] || ""}
        closeButton={<Xbutton handleClose={handleClose} />}
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
            {/* <DevTool control={control} /> */}
          </FormWrapper>
        </DialogContent>
        <br />
        <DialogActions>
          {data?.status === "draft" && (
            <Button size="small" variant="outlined" onClick={onClear}>
              Clear
            </Button>
          )}
          <Button size="small" variant="outlined" onClick={onReset}>
            Reset
          </Button>
          {data?.status === "draft" ? (
            <Button
              size="small"
              variant="outlined"
              onClick={handleSubmit(onPublish)}
            >
              Publish
            </Button>
          ) : (
            <Button
              size="small"
              variant="outlined"
              onClick={handleSubmit(onSaveAsDraft)}
            >
              Save as Draft
            </Button>
          )}
          <Button
            size="small"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            {actionButtonText?.[action]}
          </Button>
        </DialogActions>
      </DraggableDialog>
      {renderConfirmDialog()}
    </>
  );
};

export default AnnouncementDialog;
