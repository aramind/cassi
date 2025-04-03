import { Stack } from "@mui/material";
import React from "react";

const Pagination = ({ page, setPage, count }) => {
  const handleChange = (e, value) => {
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination count={count} page={page} onChange={handleChange} />
    </Stack>
  );
};

export default Pagination;
