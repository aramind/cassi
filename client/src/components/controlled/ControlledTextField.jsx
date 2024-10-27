import { Stack, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextFieldError from "./TextFieldError";

const ControlledTextField = ({ label = "", name = "", tfProps }) => {
  const { errors, control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Stack>
          <TextField
            {...tfProps}
            {...field}
            id={name}
            label={label}
            size={tfProps?.size || "small"}
            variant={tfProps?.variant || "outlined"}
            fullWidth={tfProps?.fullWidth || true}
            error={!!errors?.[name]}
          />
          <TextFieldError errorMessage={errors?.[name]?.message || ""} />
        </Stack>
      )}
    />
  );
};

export default ControlledTextField;
