export const dialogUtils = {
  getDialogTitle: (action = "", item = "") => {
    return `${action}${action === "add" ? " new " : " "}${item}`.toUpperCase();
  },
};
