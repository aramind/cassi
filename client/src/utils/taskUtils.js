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
