import React, { useState } from "react";
import FullScreenDialog from "../../components/FullScreenDialog";
import AnnouncementsBox from "./AnnouncementsBox";
import AnnouncementCard from "./AnnouncementCard";

const DeletedSection = ({
  announcements,
  handleOpenDialog,
  ...confirmHandlers
}) => {
  const [isDeletedAnnouncementsOpen, setIsDeletedAnnouncementsOpen] =
    useState(false);
  return (
    <FullScreenDialog
      open={isDeletedAnnouncementsOpen}
      setOpen={setIsDeletedAnnouncementsOpen}
      actionText="review deleted"
      title="Deleted"
    >
      <br />
      <AnnouncementsBox>
        {announcements?.map((announcement, index) => (
          <AnnouncementCard
            key={index}
            announcement={announcement}
            handleOpenDialog={handleOpenDialog}
            {...confirmHandlers}
          />
        ))}
      </AnnouncementsBox>
    </FullScreenDialog>
  );
};

export default DeletedSection;
