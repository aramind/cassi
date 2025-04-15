import React, { useState } from "react";
import BodyContainer from "../../containers/BodyContainer";
import { Stack, Typography } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import Today from "../../components/Today";
import MyButton from "../../components/buttons/MyButton";
import AnnouncementDialog from "./AnnouncementDialog";
import useAnnouncementReq from "../../hooks/api/authenticated/announcement/useAnnouncementReq";
import useConfirmActionDialog from "../../hooks/useConfirmActionDialog";
import useApiGet from "../../hooks/api/useApiGet";
import useAuth from "../../hooks/useAuth";
import LoadingPage from "../LoadingPage";
import ErrorPage from "../ErrorPage";
import AnnouncementCard from "./AnnouncementCard";
import AnnouncementsBox from "./AnnouncementsBox";
import FullScreenDialog from "../../components/FullScreenDialog";

const AnnouncementsPage = () => {
  const { auth } = useAuth();
  const [openAnnouncementDialog, setOpenAnnouncementDialog] = useState(false);
  const [openDraftedAnnouncements, setOpenDraftedAnnouncements] =
    useState(false);
  const [openDeletedAnnouncements, setOpenDeletedAnnouncements] =
    useState(false);

  const { handleOpen: handleConfirm, renderConfirmActionDialog } =
    useConfirmActionDialog();
  const {
    addAnnouncement,
    getAnnouncements,
    updateAnnouncement,
    softDelete,
    restore,
    publish,
  } = useAnnouncementReq({
    isPublic: false,
    showAck: false,
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

  const addAnnouncementHandler = () => {
    setOpenAnnouncementDialog(true);
  };

  const deleteAnnouncementHandler = (id) => {
    handleConfirm(
      "Delete Announcement",
      <Typography>Continue with the deletion?</Typography>,
      () => softDelete({ id })
    );
  };

  const handleConfirmRestore = ({ id }) => {
    handleConfirm(
      "Restore",
      <Typography>Restore this deleted announcement?</Typography>,
      () => restore({ id })
    );
  };

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
        await addAnnouncement({ data: { announcement: formData } });
        setOpenAnnouncementDialog(false);
      }
    );
  };

  const handleConfirmSaveAsDraft = ({ id, data }) => {
    handleConfirm(
      "Save as Draft",
      <Typography>Save as draft?</Typography>,
      () => updateAnnouncement({ id, data })
    );
  };

  const handleConfirmPublish = ({ id, data }) => {
    handleConfirm(
      "Publish Announcement",
      <Typography>Continue?</Typography>,
      () => updateAnnouncement({ id, data })
    );
  };

  const updateAnnouncementHandler = ({ id, data }) => {
    handleConfirm(
      "Update Announcement",
      <Typography>Proceed updating?</Typography>,
      () => updateAnnouncement({ id, data })
    );
  };

  const publishedAnnouncements = announcementsData?.data?.filter(
    (ann) => ann.status === "published"
  );
  const deletedAnnouncements = announcementsData?.data?.filter(
    (ann) => ann.status === "deleted"
  );
  const draftedAnnouncements = announcementsData?.data?.filter(
    (ann) => ann.status === "draft"
  );
  if (isLoadingInGetAnnouncements) return <LoadingPage />;
  if (isErrorInGetAnnouncements) return <ErrorPage />;
  return (
    <BodyContainer justifyContent="flex-start">
      <Stack mt={2} alignItems="center" width={1} pb={4}>
        <PageHeader text="announcements " />
        <Today />
        <br />
        <MyButton
          type="accent"
          text="add"
          variant="contained"
          onClickHandler={addAnnouncementHandler}
        />
        <br />
        {publishedAnnouncements && (
          <AnnouncementsBox>
            {publishedAnnouncements?.map((announcement, index) => (
              <AnnouncementCard
                key={index}
                announcement={announcement}
                updateHandler={updateAnnouncementHandler}
                deleteHandler={deleteAnnouncementHandler}
                saveAsDraftHandler={handleConfirmSaveAsDraft}
              />
            ))}
          </AnnouncementsBox>
        )}

        <br />
        <MyButton
          type="accent"
          text="add"
          variant="contained"
          onClickHandler={addAnnouncementHandler}
        />
        <br />
      </Stack>
      <AnnouncementDialog
        open={openAnnouncementDialog}
        setOpen={setOpenAnnouncementDialog}
        action="add"
        submitHandler={handleConfirmAddAnnouncement}
      />
      {renderConfirmActionDialog()}
      <Stack direction="row" spacing={1} width={1} justifyContent="center">
        {draftedAnnouncements?.length > 0 && (
          <FullScreenDialog
            open={openDraftedAnnouncements}
            setOpen={setOpenDraftedAnnouncements}
            actionText="open draft(s)"
            title="Drafts"
          >
            <br />
            <AnnouncementsBox>
              {draftedAnnouncements?.map((announcement, index) => (
                <AnnouncementCard
                  key={index}
                  announcement={announcement}
                  publishHandler={handleConfirmPublish}
                  updateHandler={updateAnnouncementHandler}
                  deleteHandler={deleteAnnouncementHandler}
                />
              ))}
            </AnnouncementsBox>
          </FullScreenDialog>
        )}
        {deletedAnnouncements?.length > 0 && (
          <FullScreenDialog
            open={openDeletedAnnouncements}
            setOpen={setOpenDeletedAnnouncements}
            actionText="review deleted"
            title="Deleted"
          >
            <br />
            <AnnouncementsBox>
              {deletedAnnouncements?.map((announcement, index) => (
                <AnnouncementCard
                  key={index}
                  announcement={announcement}
                  restoreHandler={handleConfirmRestore}
                  permanentDelHandler={handleConfirmRestore}
                />
              ))}
            </AnnouncementsBox>
          </FullScreenDialog>
        )}
      </Stack>
    </BodyContainer>
  );
};

export default AnnouncementsPage;
