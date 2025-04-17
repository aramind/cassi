import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const ControlledCheckBox = ({ label = "", name = "", flex = 1, icons }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Checkbox
              {...field}
              checked={!!field.value}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => field.onChange(e.target.checked)}
              icon={icons?.icon}
              checkedIcon={icons?.checkedIcon}
            />
          }
          label={label.toUpperCase()}
          sx={{ flex }}
        />
      )}
    />
  );
};

export default ControlledCheckBox;
