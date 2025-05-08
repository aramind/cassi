import React from "react";
import DeletedActionButtons from "./DeletedActionButtons";

const DeletedAnnounceActionsGroup = ({
  data,
  handleConfirmRestore,
  handleConfirmHardDelete,
}) => {
  return (
    <DeletedActionButtons
      size="small"
      direction="row"
      restoreHandler={() => handleConfirmRestore({ id: data?._id })}
      permanentDelHandler={() => handleConfirmHardDelete(data?._id)}
    />
  );
};

export default DeletedAnnounceActionsGroup;
