export const filteredAnnouncementByStatus = (announcements = []) => ({
  publishedAnnouncements: announcements?.filter(
    (a) => a.status === "published"
  ),
  draftedAnnouncements: announcements?.filter((a) => a.status === "draft"),
  deletedAnnouncements: announcements?.filter((a) => a.status === "deleted"),
});
