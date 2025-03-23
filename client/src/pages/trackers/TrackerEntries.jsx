import React, { useEffect, useMemo, useState } from "react";
import { formatDate } from "../../utils/formatDate";
import useAuth from "../../hooks/useAuth";
import { Divider, Stack, Typography } from "@mui/material";
import ActionsGroup from "./ActionsGroup";
import MyButton from "../../components/buttons/MyButton";
import AddEntryDialog from "./AddEntryDialog";

const Entry = ({ label, value }) => {
  return (
    <Stack direction="row" spacing={1}>
      <Typography flex={1}>{label.toUpperCase()}</Typography>
      <Typography flex={1}>{value.toUpperCase()}</Typography>
    </Stack>
  );
};
const TrackerEntries = ({ tracker }) => {
  const [entries, setEntries] = useState(tracker?.entries);
  const [openAddEntryDialog, setOpenAddEntryDialog] = useState(false);
  const { auth } = useAuth();
  const occupantOptions = useMemo(
    () =>
      auth?.houseInfo?.houseOccupants?.map((ho) => {
        return {
          id: ho._id,
          name: ho?.occupant?.name?.nickName || ho?.occupant?.name.firstName,
        };
      }),
    [auth?.houseInfo?.houseOccupants]
  );

  useEffect(() => {
    const formattedEntries = tracker?.entries?.map((entry, index) => ({
      ...entry,
      id: index,
      date: formatDate(entry?.date),
      originalAssignee: occupantOptions.find(
        (option) => option.id === entry?.originalAssignee
      ).name,
    }));

    setEntries(formattedEntries);
  }, [occupantOptions, tracker?.entries]);

  const addEntryHandler = () => {
    setOpenAddEntryDialog(true);
  };
  return (
    <Stack width={1} alignItems="center">
      {tracker?.entries?.length < 1 ? (
        <Typography width={1} textAlign="center">
          No entries yet
        </Typography>
      ) : (
        <>
          {entries?.map((entry) => (
            <Stack key={entry?._id} direction="column" width={1}>
              <Divider>{entry?.date}</Divider>
              <Stack direction="row">
                <Stack flex={1}>
                  <ActionsGroup row={entry} />
                </Stack>
                <Stack flex={4} p={1}>
                  <Entry label="assigned to:" value={entry?.originalAssignee} />
                </Stack>
              </Stack>
            </Stack>
          ))}
        </>
      )}
      <br />
      <MyButton
        type="primary"
        text="add entry"
        variant="contained"
        onClickHandler={addEntryHandler}
      />
      <AddEntryDialog
        open={openAddEntryDialog}
        setOpen={setOpenAddEntryDialog}
        data={tracker}
      />
    </Stack>
  );
};

export default TrackerEntries;
