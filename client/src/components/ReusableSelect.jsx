import { FormControl, MenuItem, Select } from "@mui/material";
import React from "react";

const ReusableSelect = ({
  labelId = "",
  id = "",
  value,
  onChange,
  options = [],
  styleProps = { m: 1, minWidth: "100px", width: "100%" },
  size = "small",
}) => {
  return (
    <FormControl sx={styleProps} size={size}>
      <Select labelId={labelId} id={id} value={value} onChange={onChange}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ReusableSelect;
