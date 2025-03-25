import React, { useEffect, useMemo, useState } from "react";
import { formatDate } from "../../utils/formatDate";
import useAuth from "../../hooks/useAuth";
import { Chip, Divider, Stack, Typography } from "@mui/material";
import ActionsGroup from "./ActionsGroup";
import MyButton from "../../components/buttons/MyButton";
import FaceTwoToneIcon from "@mui/icons-material/FaceTwoTone";
import EntryDialog from "./EntryDialog";

const Entry = ({ label, value, hasIcon }) => {
  return (
    <Stack direction="row" spacing={1}>
      <Typography flex={1}>{label.toUpperCase()}</Typography>
      {value && (
        <Stack justifyContent="center" flex={1} width={1}>
          {hasIcon ? (
            <Chip
              icon={<FaceTwoToneIcon />}
              label={value.toUpperCase()}
              sx={(theme) => ({
                backgroundColor: theme.palette?.accent?.light,
              })}
            />
          ) : (
            <Typography textAlign="center" flex={1}>
              {value}
            </Typography>
          )}
        </Stack>
      )}
    </Stack>
  );
};

const TrackerEntries = ({ tracker }) => {
  const [entries, setEntries] = useState(tracker?.entries);
  const [openEntryDialog, setOpenEntryDialog] = useState(false);
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
      date: formatDate(entry?.date),
      originalAssignee: occupantOptions.find(
        (option) => option.id === entry?.originalAssignee
      ).name,
    }));

    setEntries(formattedEntries);
  }, [occupantOptions, tracker?.entries]);

  const addEntryHandler = () => {
    setOpenEntryDialog(true);
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
                  <ActionsGroup data={entry} />
                </Stack>
                <Stack flex={4} p={1}>
                  <Entry
                    label="assigned to :"
                    value={entry?.originalAssignee}
                    hasIcon
                  />
                  <Entry label="done by :" value={entry?.completedBy} hasIcon />
                  <Entry
                    label="comments :"
                    value={entry?.comments?.join("; ")}
                  />
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

      <EntryDialog
        open={openEntryDialog}
        setOpen={setOpenEntryDialog}
        data={tracker}
      />
    </Stack>
  );
};

export default TrackerEntries;
