import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const ControlledCheckBox = ({ label = "", name = "", flex = 1 }) => {
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
              onChange={(e) => field.onChange(e.target.checked)}
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
