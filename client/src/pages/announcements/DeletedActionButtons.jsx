import { IconButton, Stack } from "@mui/material";
import RestoreRoundedIcon from "@mui/icons-material/RestoreRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const DeletedActionButtons = ({
  size,
  direction,
  restoreHandler,
  permanentDelHandler,
}) => {
  return (
    <Stack direction={direction} size={size}>
      <IconButton aria-label="edit" onClick={permanentDelHandler}>
        <DeleteRoundedIcon />
      </IconButton>
      <IconButton aria-label="delete" onClick={restoreHandler}>
        <RestoreRoundedIcon />
      </IconButton>
    </Stack>
  );
};

export default DeletedActionButtons;
