import React from "react";
import AnnouncementsBox from "./AnnouncementsBox";
import AnnouncementCard from "./AnnouncementCard";

const PublishedSection = ({
  announcements,
  handleOpenDialog,
  ...confirmHandlers
}) => {
  return (
    <AnnouncementsBox>
      {announcements?.map((announcement, index) => (
        <AnnouncementCard
          key={index}
          announcement={announcement}
          {...confirmHandlers}
          handleOpenDialog={handleOpenDialog}
        />
      ))}
    </AnnouncementsBox>
  );
};

export default PublishedSection;
