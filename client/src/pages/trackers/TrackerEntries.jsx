import React, { useEffect, useState } from "react";
import { Chip, Divider, Stack, Typography } from "@mui/material";
import ActionsGroup from "./ActionsGroup";
import FaceTwoToneIcon from "@mui/icons-material/FaceTwoTone";
import useHouseProvider from "../../hooks/useHouseProvider";
import { formatToMMDDYYYY } from "../../utils/date";

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

const TrackerEntries = ({ tracker, submitHandler, deleteEntryHandler }) => {
  const [entries, setEntries] = useState(tracker?.entries);
  const { occupantOptions } = useHouseProvider();
  useEffect(() => {
    const formattedEntries = tracker?.entries?.map((entry, index) => ({
      ...entry,
      // date: formatDate(entry?.date),
      date: formatToMMDDYYYY(entry?.date),
      originalAssignee: occupantOptions.find(
        (option) => option.id === entry?.originalAssignee
      )?.name,
      completedBy: occupantOptions.find(
        (option) => option.id === entry?.completedBy
      )?.name,
      comments: entry?.comments?.join(";"),
    }));

    setEntries(formattedEntries);
  }, [occupantOptions, tracker?.entries]);

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
                  <ActionsGroup
                    data={entry}
                    submitHandler={submitHandler}
                    deleteEntryHandler={deleteEntryHandler}
                  />
                </Stack>
                <Stack flex={4} p={1}>
                  <Entry
                    label="assigned to :"
                    value={entry?.originalAssignee}
                    hasIcon
                  />
                  <Entry label="done by :" value={entry?.completedBy} hasIcon />
                  <Entry label="comments :" value={entry?.comments} />
                </Stack>
              </Stack>
            </Stack>
          ))}
        </>
      )}
    </Stack>
  );
};

export default TrackerEntries;
