import React from "react";
import DeletedActionButtons from "./DeletedActionButtons";

const DeletedAnnounceActionsGroup = ({
  data,
  handleConfirmRestore,
  permanentDelHandler,
}) => {
  return (
    <DeletedActionButtons
      size="small"
      direction="row"
      restoreHandler={() => handleConfirmRestore({ id: data?._id })}
      permanentDelHandler={() => permanentDelHandler(data?._id)}
    />
  );
};

export default DeletedAnnounceActionsGroup;
