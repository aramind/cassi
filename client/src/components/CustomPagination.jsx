import { Pagination } from "@mui/material";
import React from "react";

const CustomPagination = ({ count, page, onChange }) => {
  return (
    <Pagination
      count={count}
      page={page}
      onChange={onChange}
      sx={(theme) => ({
        "& .Mui-selected": { backgroundColor: theme.palette.accent.light },
      })}
    />
  );
};

export default CustomPagination;
