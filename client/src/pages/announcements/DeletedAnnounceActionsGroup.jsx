import React, { useState } from "react";
import DeletedActionButtons from "./DeletedActionButtons";

const DeletedAnnounceActionsGroup = ({
  data,
  restoreHandler,
  permanentDelHandler,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  console.log(data);
  return (
    <>
      <DeletedActionButtons
        size="small"
        direction="row"
        restoreHandler={restoreHandler}
        permanentDelHandler={permanentDelHandler}
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

export default DeletedAnnounceActionsGroup;
