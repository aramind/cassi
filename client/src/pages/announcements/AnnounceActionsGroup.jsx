import React, { useCallback } from "react";
import ActionButtons from "../../components/ActionButtons";

const AnnounceActionsGroup = ({
  data,
  handleConfirmSoftDelete,
  handleOpenDialog,
}) => {
  const handleEdit = useCallback(() => {
    handleOpenDialog("update", data);
  }, [data, handleOpenDialog]);

  return (
    <>
      <ActionButtons
        size="small"
        direction="row"
        editHandler={handleEdit}
        deleteHandler={() => handleConfirmSoftDelete(data?._id)}
      />
    </>
  );
};

export default AnnounceActionsGroup;
