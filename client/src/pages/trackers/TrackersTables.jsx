import React, { useEffect, useMemo, useState } from "react";

import {
  Box,
  Divider,
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
import ActionsGroup from "./ActionsGroup";

const TrackersTables = ({ tracker }) => {
  const [rows, setRows] = useState(tracker?.entries);
  const [openAddEntryDialog, setOpenAddEntryDialog] = useState(false);

  console.log(rows);
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

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const columns = [
    {
      headerName: "actions",
      renderCell: (params) => <ActionsGroup row={params.row} />,
    },
    { field: "date", headerName: "date" },
    // {
    //   field: "originalAssignee",
    //   headerName: "assigned to",
    //     <RenderSelectUsers
    //   renderCell: (params) => (
    //       occupantOptions={occupantOptions}
    //       selectedOccupant={params?.row?.originalAssignee}
    //     />
    //   ),
    // },
    // {
    //   field: "completedBy",
    //   headerName: "completed by",
    //   renderCell: (params) => (
    //     <RenderSelectUsers
    //       occupantOptions={occupantOptions}
    //       selectedOccupant={params?.row?.completedBy || ""}
    //     />
    //   ),
    // },
    { field: "originalAssignee", headerName: "assigned to" },
    { field: "completedBy", headerName: "completed by" },
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
      originalAssignee: occupantOptions.find(
        (option) => option.id === entry?.originalAssignee
      ).name,
    }));

    setRows(processedRows);
  }, [occupantOptions, tracker?.entries]);
  // onclick handlers

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
          {rows?.map((row) => (
            <Stack
              key={row?._id}
              // className="outlined2"
              direction="column"
              width={1}
            >
              <Divider>{row?.date}</Divider>
              <Stack direction="row">
                <Stack flex={1}>
                  <ActionsGroup row={row} />
                </Stack>
                <Stack flex={4} p={1}>
                  {/* <Stack direction="row" spacing={1}>
                  <Typography flex="1">DATE:</Typography>
                  <Typography flex="1">{row?.date}</Typography>
                </Stack> */}
                  <Stack direction="row" spacing={1}>
                    <Typography flex="1">ASSIGNED TO:</Typography>
                    <Typography flex="1">{row?.originalAssignee}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <Typography flex="1">DONE BY:</Typography>
                    <Typography flex="1">{row?.completedBy}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <Typography flex="1">COMMENTS:</Typography>
                    <Typography flex="1">{row?.comments}</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          ))}
        </>

        // <>
        //   <TableContainer sx={{ maxHeight: 440 }}>
        //     <Table stickyHeader>
        //       <TableHead>
        //         <TableRow>
        //           {columns?.map((column, index) => (
        //             <TableCell
        //               key={index}
        //               align="center"
        //               sx={{ fontWeight: "bold" }}
        //             >
        //               {column.headerName?.toUpperCase()}
        //             </TableCell>
        //           ))}
        //         </TableRow>
        //       </TableHead>
        //       <TableBody>
        //         {rows
        //           .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        //           .map((row, index) => (
        //             <TableRow key={index}>
        //               {columns?.map((col, index) => (
        //                 <TableCell align="center" key={index}>
        //                   {col.renderCell
        //                     ? col.renderCell({ row })
        //                     : row[col.field]}
        //                 </TableCell>
        //               ))}
        //             </TableRow>
        //           ))}
        //       </TableBody>
        //     </Table>
        //   </TableContainer>
        //   <TablePagination
        //     rowsPerPageOptions={[10, 25, 100]}
        //     component="div"
        //     count={rows.length}
        //     rowsPerPage={rowsPerPage}
        //     page={page}
        //     onPageChange={handleChangePage}
        //     onRowsPerPageChange={handleChangeRowsPerPage}
        //   />
        // </>
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

export default TrackersTables;
