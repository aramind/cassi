import { Typography } from "@mui/material";

export const dialogUtils = {
  getDialogTitle: (action = "", item = "") => {
    return `${action}${action === "add" ? " new " : " "}${item}`.toUpperCase();
  },
};

export const getConfirmText = (action, item) => {
  const message = {
    add: `Continue adding this ${item}?`,
    update: `Continue updating this ${item}?`,
    delete: `Are you sure you want to delete this ${item}`,
  };

  let text = message[action] || "Continue?";
  return <Typography>{text.toUpperCase()}</Typography>;
};
