import React, { useCallback, useEffect, useState } from "react";
import RenderSelectUsers from "./RenderSelectUsers";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import MyButton from "../../components/buttons/MyButton";
import AddEntryDialog from "./AddEntryDialog";
import { formatDate } from "../../utils/formatDate";
import useAuth from "../../hooks/useAuth";

const TrackersTables = ({ tracker }) => {
  const [rows, setRows] = useState(tracker?.entries);
  const [openAddEntryDialog, setOpenAddEntryDialog] = useState(false);
  const { auth } = useAuth();

  const occupantOptions = auth?.houseInfo?.houseOccupants?.map((ho) => {
    return {
      id: ho._id,
      name: ho?.occupant?.name?.nickName || ho?.occupant?.name.firstName,
    };
  });

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const columns = [
    { field: "date", headerName: "date" },
    {
      field: "originalAssignee",
      headerName: "assigned to",
      renderCell: (params) => (
        <RenderSelectUsers
          occupantOptions={occupantOptions}
          selectedOccupant={params?.row?.originalAssignee}
        />
      ),
    },
    {
      field: "completedBy",
      headerName: "completed by",
      renderCell: (params) => (
        <RenderSelectUsers
          occupantOptions={occupantOptions}
          selectedOccupant={params?.row?.originalAssignee}
        />
      ),
    },
    { field: "comments", headerName: "comments" },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const processedRows = tracker?.entries?.map((entry, index) => ({
      ...entry,
      id: index,
      date: formatDate(entry?.date),
    }));

    setRows(processedRows);
  }, [tracker?.entries]);
  // onclick handlers

  const addEntryHandler = () => {
    setOpenAddEntryDialog(true);
  };

  const addEntry = useCallback(() => {
    alert("Adding entry");
  }, []);

  return (
    <Stack width={1} alignItems="center">
      {tracker?.entries?.length < 1 ? (
        <Typography width={1} textAlign="center">
          No entries yet
        </Typography>
      ) : (
        <>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns?.map((column, index) => (
                    <TableCell
                      key={index}
                      align="center"
                      sx={{ fontWeight: "bold" }}
                    >
                      {column.headerName?.toUpperCase()}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index}>
                      {columns?.map((col, index) => (
                        <TableCell align="center" key={index}>
                          {col.renderCell
                            ? col.renderCell({ row })
                            : row[col.field]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
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
        tracker={tracker}
      />
    </Stack>
  );
};

export default TrackersTables;
