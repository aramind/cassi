export const TASK_CONSTANTS = {
  TYPE_OPTIONS: [
    {
      label: "general",
      value: "general",
    },
    {
      label: "cleaning",
      value: "cleaning",
    },
    {
      label: "maintenance",
      value: "maintenance",
    },
    {
      label: "bills",
      value: "bills",
    },
    {
      label: "others",
      value: "others",
    },
  ],
  RECURRENCE_OPTIONS: [
    {
      label: "daily",
      value: "daily",
    },
    {
      label: "weekly",
      value: "weekly",
    },
    {
      label: "monthly",
      value: "monthly",
    },
    {
      label: "yearly",
      value: "yearly",
    },
    {
      label: "others",
      value: "others",
    },
  ],
};

export const OPTIONS_FOR_FILTERS = {
  PRIORITY: ["low", "medium", "high"],
  TYPE: ["general", "cleaning", "maintenance", "bills", "others"],
  ISCOMPLETED: [true, false],
  ISRECURRING: [true, false],
};
