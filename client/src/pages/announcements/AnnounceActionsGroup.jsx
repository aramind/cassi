import React, { useCallback } from "react";
import ActionButtons from "../../components/ActionButtons";

const AnnounceActionsGroup = ({ data, deleteHandler, handleOpenDialog }) => {
  const handleEdit = useCallback(() => {
    handleOpenDialog("update", data);
  }, [data, handleOpenDialog]);

  return (
    <>
      <ActionButtons
        size="small"
        direction="row"
        editHandler={handleEdit}
        deleteHandler={() => deleteHandler(data?._id)}
      />
    </>
  );
};

export default AnnounceActionsGroup;
