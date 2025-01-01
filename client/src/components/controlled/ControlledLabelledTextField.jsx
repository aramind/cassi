import { Stack, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import LabelWrapper from "../../wrappers/LabelWrapper";

const ControlledLabelledTextField = ({
  label = "",
  name = "",
  multiline = false,
  customDefaultValue,
  tfProps,
  flex,
}) => {
  const { control, errors } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Stack flex={flex || 1}>
          <LabelWrapper
            id={name}
            label={label}
            hasError={!!errors?.[name]}
            error={errors?.[name]?.message}
          >
            <TextField
              {...tfProps}
              {...field}
              value={field?.value || ""}
              id={name}
              multiline={multiline}
              size={tfProps?.size || "small"}
              variant={tfProps?.variant || "outlined"}
              fullWidth={tfProps?.fullWidth || true}
              error={!!errors?.[name]}
            />
          </LabelWrapper>
        </Stack>
      )}
    />
  );
};

export default ControlledLabelledTextField;
