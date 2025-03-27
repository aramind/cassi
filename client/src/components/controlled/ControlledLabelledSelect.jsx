import { FormControl, MenuItem, Select, Stack } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import LabelWrapper from "../../wrappers/LabelWrapper";

const ControlledLabelledSelect = ({
  id = "",
  label = "",
  name = "",

  options = [],
  defaultValue,
  initialProps,
  styleProps,
  flex,
  size = "small",
}) => {
  const { control, errors } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Stack flex={flex || 1}>
          <LabelWrapper
            id={id}
            label={label}
            hasError={!!errors?.[name]}
            error={errors?.[name]?.message}
          >
            <FormControl sx={styleProps} size={size}>
              <Select labelId={id} id={id} {...field}>
                {options?.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </LabelWrapper>
        </Stack>
      )}
    />
  );
};

export default ControlledLabelledSelect;
