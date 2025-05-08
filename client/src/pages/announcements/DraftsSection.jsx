import React, { useState } from "react";
import FullScreenDialog from "../../components/FullScreenDialog";
import AnnouncementsBox from "./AnnouncementsBox";
import AnnouncementCard from "./AnnouncementCard";

const DraftsSection = ({
  announcements,
  handleOpenDialog,
  ...confirmHandlers
}) => {
  const [isDraftsOpen, setDraftsOpen] = useState(false);

  return (
    <FullScreenDialog
      open={isDraftsOpen}
      setOpen={setDraftsOpen}
      actionText="open draft(s)"
      title="Drafts"
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

export default DraftsSection;
