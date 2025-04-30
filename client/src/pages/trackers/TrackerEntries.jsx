import React, { useState } from "react";
import { Box, Chip, IconButton, Stack, Typography } from "@mui/material";
import FaceTwoToneIcon from "@mui/icons-material/FaceTwoTone";
import useHouseProvider from "../../hooks/useHouseProvider";
import { convertToISOFormat, formatToMMDDYYYY } from "../../utils/date";
import CustomPagination from "../../components/CustomPagination";
import { formatDate } from "../../utils/formatDate";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const PAGE_SIZE = 5;

const Entry = ({ label, value, hasIcon }) => {
  return (
    <Stack direction="row" spacing={1}>
      <Typography flex={1}>{label.toUpperCase()}</Typography>
      {value && (
        <Stack justifyContent="center" flex={1} width={1}>
          {hasIcon ? (
            <Chip
              icon={<FaceTwoToneIcon />}
              label={value}
              size="small"
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

const Line = () => (
  <Box width={1} height="4px" bgcolor="primary.light" borderRadius="2px" />
);
const TrackerEntries = ({
  tracker,
  handleOpenEntryDialog,
  handleConfirmDeleteEntry,
}) => {
  const [page, setPage] = useState(1);
  const { occupantOptions } = useHouseProvider();

  const formattedEntries =
    tracker?.entries
      ?.sort((a, b) => new Date(b.date) - new Date(a.date))
      ?.map((entry) => ({
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
      })) || [];

  // pagination logic

  const totalPages = Math.ceil(formattedEntries?.length / PAGE_SIZE);

  const paginatedEntries = formattedEntries.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );
  return (
    <Stack width={1} alignItems="center">
      {tracker?.entries?.length < 1 ? (
        <Typography width={1} textAlign="center">
          No entries yet
        </Typography>
      ) : (
        <>
          {paginatedEntries?.map((entry) => (
            <Stack key={entry?._id} direction="column" width={1}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Line />
                <Box width={1}>
                  <Typography
                    color="primary.dark"
                    variant="h6"
                    textAlign="center"
                  >
                    {formatDate(convertToISOFormat(entry?.date))}
                  </Typography>
                </Box>
                <Line />
              </Stack>
              <Stack direction="row">
                <Stack flex={1}>
                  <>
                    <IconButton
                      aria-label="edit"
                      onClick={() =>
                        handleOpenEntryDialog("update", {
                          tracker,
                          entryData: entry,
                        })
                      }
                    >
                      <EditRoundedIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() =>
                        handleConfirmDeleteEntry(tracker, entry?._id)
                      }
                    >
                      <DeleteRoundedIcon />
                    </IconButton>
                  </>
                </Stack>
                <Stack flex={4} p={1} spacing={0.5}>
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

          {totalPages > 1 && (
            <Box my={1}>
              <CustomPagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
              />
            </Box>
          )}
        </>
      )}
    </Stack>
  );
};

export default TrackerEntries;
