import React, { useCallback, useEffect, useState } from "react";
import RenderSelectUsers from "./RenderSelectUsers";
import {
  Box,
  Paper,
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

const columns = [
  { field: "date", headerName: "date" },
  {
    field: "originalAssignee",
    headerName: "assigned to",
    renderCell: (params) => <RenderSelectUsers />,
  },
  {
    field: "doneBy",
    headerName: "completed by",
    renderCell: (params) => <RenderSelectUsers />,
  },
  { field: "comments", headerName: "comments" },
];

const TrackersTables = ({ tracker }) => {
  const [rows, setRows] = useState(tracker?.entries);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const processedRows = tracker?.entries?.map((entry, index) => ({
      id: index,
      ...entry,
    }));

    setRows(processedRows);
  }, [tracker?.entries]);

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
                  .map((row) => (
                    <TableRow>
                      {columns?.map((col) => (
                        <TableCell align="center">
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
        onClickHandler={addEntry}
      />
    </Stack>
  );
};

export default TrackersTables;
