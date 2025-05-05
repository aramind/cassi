import React from "react";
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
    restore,
    publish,
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

          console.log(res);
          if (res?.success) {
            handleCloseDialog();
          }
        } catch (error) {
          console.error(error);
        }
      }
    );
  };

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
    isLoadingInPublish ||
    isLoadingInGetAnnouncements;

  const isError = isErrorInGetAnnouncements;
  return {
    handleConfirmAddAnnouncement,
    announcementsData,
    isLoading,
    isError,
    renderConfirmActionDialog,
  };
};

export default useAnnouncementActions;
