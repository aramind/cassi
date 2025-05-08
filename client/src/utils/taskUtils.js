export const prepRemarks = (remarks) => {
  if (typeof remarks === "string") {
    return remarks.split("/")?.map((c) => c.trim());
  }
  if (Array.isArray(remarks)) {
    return remarks;
  }
  return [];
};
