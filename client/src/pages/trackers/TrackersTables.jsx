import React, { useEffect, useState } from "react";
import RenderSelectUsers from "./RenderSelectUsers";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { mockDB } from "../../mockDB/mockDB";

const setId = (tracker, index) => {
  return tracker?._id || index + 1;
};

const createColumns = () => {
  return [
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
};

const TrackersTables = () => {
  const [rows, setRows] = useState(mockDB?.trackers?.[0]?.record);

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
    const processedRows = mockDB?.trackers?.[0]?.record?.map(
      (tracker, index) => ({
        id: setId(tracker, index),
        ...tracker,
      })
    );

    setRows(processedRows);
  }, []);

  console.log(rows);
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {createColumns().map((column) => (
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
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
                  {createColumns().map((col) => (
                    <TableCell align="center">{row[col?.field]}</TableCell>
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
    </Paper>
  );
};

export default TrackersTables;
