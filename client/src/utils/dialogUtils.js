import { Typography } from "@mui/material";

export const dialogUtils = {
  getDialogTitle: (action = "", item = "") => {
    return `${action}${action === "add" ? " new " : " "}${item}`.toUpperCase();
  },
};

export const getConfirmText = (action, item) => {
  let text = "Continue?";
  if (!item) {
    return <Typography>{text}</Typography>;
  } else {
    const message = {
      add: `Continue adding this ${item}?`,
      update: `Continue updating this ${item}?`,
      delete: `Are you sure you want to delete this ${item}?`,
    };
    text = message[action] || "Continue?";
    return <Typography>{text}</Typography>;
  }
};
