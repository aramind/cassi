export const prepRemarks = (remarks) => {
  if (typeof remarks === "string") {
    return remarks.split("/")?.map((c) => c.trim());
  }
  if (Array.isArray(remarks)) {
    return remarks;
  }
  return [];
};

export const PRIORITY_MAP = {
  low: 1,
  medium: 2,
  high: 3,
};

export const getSortedTasks = (tasks, method) => {
  if (!tasks || !Array.isArray(tasks)) return [];

  const sorted = [...tasks];

  switch (method) {
    case "DATE-NEWEST":
      return sorted.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
    case "DATE-OLDEST":
      return sorted.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    case "PRIORITY-HIGHEST":
      return sorted.sort(
        (a, b) => PRIORITY_MAP[b.priority] - PRIORITY_MAP[a.priority]
      );
    case "PRIORITY-LOWEST":
      return sorted.sort(
        (a, b) => PRIORITY_MAP[a.priority] - PRIORITY_MAP[b.priority]
      );
    case "NAME-ASC":
      return sorted.sort((a, b) => a.title?.localeCompare(b.title));
    case "NAME-DES":
      return sorted.sort((a, b) => b.title?.localeCompare(a.title));
    default:
      return sorted;
  }
};
