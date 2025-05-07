import React, { useCallback } from "react";
import useAnnouncementReq from "./useAnnouncementReq";
import useConfirmActionDialog from "../../../useConfirmActionDialog";
import useApiSendAsync from "../../useApiSendAsync";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import useApiGet from "../../useApiGet";
import useAuth from "../../../useAuth";

const useAnnouncementActions = ({ handleCloseDialog }) => {
  const { auth } = useAuth();
  const {
    addAnnouncement,
    updateAnnouncement,
    softDelete,
    hardDelete,
    restore,
    getAnnouncements,
  } = useAnnouncementReq({ isPublic: false, showAck: false });

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

  const { send: sendHardDelete, isLoadingInHardDelete } = useApiSendAsync(
    hardDelete,
    ["announcements"]
  );

  const { send: sendRestore, isLoadingInRestore } = useApiSendAsync(restore, [
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

  const handleConfirmUpdate = ({ id, data }) => {
    handleConfirm(
      "Update Announcement",
      "Update this announcement?",
      async () => {
        try {
          const res = await sendUpdate({ id, data }, { showFeedbackMsg: true });

          if (res?.success) {
            handleCloseDialog();
          }
        } catch (error) {
          console.error(error);
        }
      }
    );
  };

  const handleConfirmPublish = ({ id, data }) => {
    handleConfirm(
      "Publish Announcement",
      "Publish this announcement?",
      async () => {
        try {
          const res = await sendUpdate({ id, data }, { showFeedbackMsg: true });

          if (res?.success) {
            handleCloseDialog();
          }
        } catch (error) {
          console.error(error);
        }
      }
    );
  };

  const handleConfirmRestore = ({ id }) => {
    handleConfirm("Restore", "Restore this deleted announcement?", async () => {
      try {
        await sendRestore({ id }, { showFeedbackMsg: true });
      } catch (error) {
        console.error(error);
      }
    });
  };

  const handleConfirmSaveAsDraft = useCallback(
    ({ id, data }) => {
      handleConfirm("Save as Draft", "Save as Draft?", async () => {
        try {
          const res = await sendUpdate({ id, data }, { showFeedbackMsg: true });

          if (res?.success) {
            handleCloseDialog();
          }
        } catch (error) {
          console.error(error);
        }
      });
    },
    [handleCloseDialog, handleConfirm, sendUpdate]
  );

  const handleConfirmSoftDelete = useCallback(
    (id) => {
      handleConfirm(
        "Delete",
        "Are you sure you want to delete this announcement?",
        async () => {
          try {
            await sendSoftDelete(id, { showFeedbackMsg: true });
          } catch (error) {
            console.error(error);
          }
        }
      );
    },
    [handleConfirm, sendSoftDelete]
  );

  const handleConfirmHardDelete = useCallback((id) => {
    handleConfirm(
      "Delete",
      <Stack spacing={2}>
        <Typography component="span">
          Are you sure you want to{" "}
          <Typography
            textTransform="uppercase"
            color="error"
            component="span"
            fontWeight="bold"
          >
            permanently
          </Typography>{" "}
          remove this from database?
        </Typography>
        <Typography textTransform="uppercase" color="error">
          NOTE: This is process is not reversible
        </Typography>
      </Stack>,
      async () => {
        try {
          await sendHardDelete(id, { showFeedbackMsg: true });
        } catch (error) {
          console.error(error);
        }
      }
    );
  });
  const {
    data: announcementsData,
    isLoading: isLoadingInGetAnnouncements,
    isError: isErrorInGetAnnouncements,
  } = useApiGet(
    ["announcements"],
    () =>
      getAnnouncements(
        `?fields=_id,title,content,house,createdBy,isPinned,status,type,importance,createdAt,updatedAt,revisions`
      ),
    {
      enabled: !!auth?.houseInfo?._id,
    }
  );

  const isLoading =
    isLoadingInAdding ||
    isLoadingInUpdate ||
    isLoadingInSoftDelete ||
    isLoadingInRestore ||
    isLoadingInHardDelete ||
    isLoadingInGetAnnouncements;

  const isError = isErrorInGetAnnouncements;
  return {
    handleConfirmAddAnnouncement,
    handleConfirmPublish,
    handleConfirmUpdate,
    handleConfirmRestore,
    handleConfirmSaveAsDraft,
    handleConfirmSoftDelete,
    handleConfirmHardDelete,
    announcementsData,
    isLoading,
    isError,
    renderConfirmActionDialog,
  };
};

export default useAnnouncementActions;
