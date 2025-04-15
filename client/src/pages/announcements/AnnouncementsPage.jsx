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

const AnnouncementsPage = () => {
  const { auth } = useAuth();
  const [openAnnouncementDialog, setOpenAnnouncementDialog] = useState(false);
  const { handleOpen: handleConfirm, renderConfirmActionDialog } =
    useConfirmActionDialog();
  const { addAnnouncement, getAnnouncements, updateAnnouncement } =
    useAnnouncementReq({
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
  const handleSaveAsDraft = () => {
    alert("saving as draft...");
  };

  const updateAnnouncementHandler = ({ id, data }) => {
    handleConfirm(
      "Update Announcement",
      <Typography>Proceed updating?</Typography>,
      () => updateAnnouncement({ id, data })
    );
  };

  const deleteAnnouncementHandler = ({ id, data }) => {
    alert("deleting announcement..");
    updateAnnouncement({ id, data: { ...data, status: "deleted" } });
  };

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

        <AnnouncementsBox>
          {announcementsData?.data?.map((announcement, index) => (
            <AnnouncementCard
              key={index}
              announcement={announcement}
              updateHandler={updateAnnouncementHandler}
              deleteHandler={deleteAnnouncementHandler}
            />
          ))}
        </AnnouncementsBox>
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
        handleSaveAsDraft={handleSaveAsDraft}
        submitHandler={handleConfirmAddAnnouncement}
      />
      {renderConfirmActionDialog()}
    </BodyContainer>
  );
};

export default AnnouncementsPage;
