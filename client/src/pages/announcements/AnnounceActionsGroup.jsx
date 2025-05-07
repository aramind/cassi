import React, { useCallback, useState } from "react";
import ActionButtons from "../../components/ActionButtons";
import AnnouncementDialog from "./AnnouncementDialog";
const AnnounceActionsGroup = ({
  data,
  updateHandler,
  deleteHandler,
  handleOpenDialog,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
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
      {/* <AnnouncementDialog
        open={openDialog}
        setOpen={setOpenDialog}
        data={data}
        action="update"
        submitHandler={updateHandler}
      /> */}
    </>
  );
};

export default AnnounceActionsGroup;
