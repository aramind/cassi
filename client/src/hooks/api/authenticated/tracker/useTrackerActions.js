import React from "react";
import useUpdateTracker from "./useUpdateTracker";
import useConfirmActionDialog from "../../../useConfirmActionDialog";
import useTrackerReq from "../useTrackerReq";
import { getConfirmText } from "../../../../utils/dialogUtils";
import { Typography } from "@mui/material";
import { convertToISOFormat } from "../../../../utils/date";

const useTrackerActions = ({ handleCloseDialog }) => {
  const { handleOpen: handleConfirm, renderConfirmActionDialog } =
    useConfirmActionDialog();
  const { sendUpdateTracker, isLoadingInUpdatingTracker } = useUpdateTracker();

  const { addTracker } = useTrackerReq({ isPublic: false, showAck: false });

  const handleConfirmAddTracker = (formData) => {
    handleConfirm("Add tracker", getConfirmText("add", "tracker"), async () => {
      await addTracker({ data: { tracker: formData } });
      handleCloseDialog();
    });
  };

  // handlers for entries

  const handleAddingEntry = async (tracker, data) => {
    const newEntry = {
      ...data,
      date: convertToISOFormat(data?.date),
      comments: data?.comments?.split("/"),
    };
    const updatedEntries = [newEntry, ...(tracker?.entries || [])];

    await sendUpdateTracker(
      {
        trackerId: tracker?._id,
        data: { entries: updatedEntries },
      },
      {
        showSuccess: "Entry added successfully!",
        showError: true,
      }
    );
  };

  const handleUpdatingEntry = async (tracker, data) => {
    const formattedData = {
      ...data,
      date: convertToISOFormat(data?.date),
      comments: data?.comments?.split("/"),
    };

    const updatedEntries = tracker?.entries?.map((entry) =>
      entry?._id === formattedData?._id ? { ...entry, ...formattedData } : entry
    );

    await sendUpdateTracker(
      {
        trackerId: tracker?._id,
        data: { entries: updatedEntries },
      },
      {
        showSuccess: "Entry updated successfully!",
        showError: true,
      }
    );
  };

  const handleConfirmDeleteEntry = (tracker) =>
    handleConfirm(
      "Confirm Delete",
      <Typography>Are you sure you want to delete this entry?</Typography>,
      async (entryId) => {
        const updatedEntries = tracker?.entries?.filter(
          (entry) => entry._id !== entryId
        );

        await sendUpdateTracker(
          {
            trackerId: tracker?._id,
            data: { entries: updatedEntries },
          },
          {
            showSuccess: "Entry deleted successfully!",
            showError: true,
          }
        );
      }
    );

  const handleConfirmRestore = (trackerId, trackerTitle) => {
    handleConfirm(
      "Confirm Restore",
      <>
        <Typography>Are you sure you want to restore this tracker?</Typography>
        <br />
        <Typography width={1} variant="h4" textAlign="center">
          {trackerTitle}
        </Typography>
      </>,
      async () => {
        try {
          await sendUpdateTracker(
            {
              trackerId: trackerId,
              data: { status: "active" },
            },
            {
              showFeedbackMsg: true,
              message: "Tracker restored",
            }
          );
        } catch (error) {
          console.error(error);
        }
      }
    );
  };

  const handleUpdatingTrackerInfo = (id, updates) => {
    handleConfirm(
      "Confirm Update",
      getConfirmText("update", "tracker"),
      async () => {
        try {
          await sendUpdateTracker(
            {
              trackerId: id,
              data: updates,
            },
            { showFeedbackMsg: true }
          );

          handleCloseDialog();
        } catch (error) {
          console.error(error);
        }
      }
    );
  };

  const handleDeletingTrackerInfo = (tracker, updates) =>
    handleConfirm(
      "Confirm Delete",
      getConfirmText("delete", "tracker"),
      async () => {
        try {
          await sendUpdateTracker(
            {
              trackerId: tracker?._id,
              data: updates,
            },
            { showFeedbackMsg: true, message: "Tracker deleted successfully." }
          );
          handleCloseDialog();
        } catch (error) {
          console.log(error);
        }
      }
    );

  return {
    handleConfirmAddTracker,
    handleAddingEntry,
    handleUpdatingEntry,
    handleConfirmDeleteEntry,
    handleConfirmRestore,
    handleUpdatingTrackerInfo,
    handleDeletingTrackerInfo,
    renderConfirmActionDialog,
    isLoadingInUpdatingTracker,
  };
};

export default useTrackerActions;
