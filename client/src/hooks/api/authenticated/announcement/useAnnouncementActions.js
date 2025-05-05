import React from "react";
import useAnnouncementReq from "./useAnnouncementReq";
import useConfirmActionDialog from "../../../useConfirmActionDialog";
import useApiSendAsync from "../../useApiSendAsync";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";

const useAnnouncementActions = ({ handleCloseDialog }) => {
  const { addAnnouncement, updateAnnouncement, softDelete, restore, publish } =
    useAnnouncementReq({ isPublic: false, showAck: false });

  const { handleOpen: handleConfirm, renderConfirmActionDialog } =
    useConfirmActionDialog();

  const { send: sendAdd, isLoadingInAdding } = useApiSendAsync(
    addAnnouncement,
    ["announcements"]
  );

  const { send: sendUpdate, isLoadingInUpdate } = useApiSendAsync(
    updateAnnouncement,
    ["announcements"]
  );

  const { send: sendSoftDelete, isLoadingInSoftDelete } = useApiSendAsync(
    softDelete,
    ["announcements"]
  );

  const { send: sendRestore, isLoadingInRestore } = useApiSendAsync(restore, [
    "announcements",
  ]);

  const { send: sendPublish, isLoadingInPublish } = useApiSendAsync(publish, [
    "announcements",
  ]);

  const handleConfirmAddAnnouncement = (formData) => {
    handleConfirm(
      "Publish Announcement",
      <Stack spacing={2}>
        <Typography>Proceed publishing this announcement?</Typography>

        <Typography variant="h4">
          <strong>TITLE : </strong>
          {formData?.title}
        </Typography>
      </Stack>,
      async () => {
        try {
          const res = await sendAdd(
            { data: { announcement: formData } },
            { showFeedbackMsg: true }
          );

          if (res?.success) {
            handleCloseDialog();
          }
        } catch (error) {
          console.error(error);
        }
      }
    );
  };
  return {
    handleConfirmAddAnnouncement,
  };
};

export default useAnnouncementActions;
