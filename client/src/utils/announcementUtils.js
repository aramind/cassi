export const filteredAnnouncementByStatus = (announcements = []) => ({
  publishedAnnouncements: announcements?.filter(
    (a) => a.status === "published"
  ),
  draftedAnnouncements: announcements?.filter((a) => a.status === "draft"),
  deletedAnnouncements: announcements?.filter((a) => a.status === "deleted"),
});

export const dialogTitle = {
  add: "Add New Announcement",
  update: "Update Announcement",
};

export const actionButtonText = {
  add: "submit",
  update: "update",
};

export const TYPE_OPTIONS = [
  {
    label: "general",
    value: "general",
  },
  {
    label: "reminder",
    value: "reminder",
  },
  {
    label: "rules",
    value: "rules",
  },
  {
    label: "emergency",
    value: "emergency",
  },
  {
    label: "maintenance",
    value: "maintenance",
  },
  {
    label: "inquiry",
    value: "inquiry",
  },
  {
    label: "others",
    value: "others",
  },
];
