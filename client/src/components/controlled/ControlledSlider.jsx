import { Slider, Stack } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import LabelWrapper from "../../wrappers/LabelWrapper";

const ControlledSlider = ({
  name = "",
  label = "",
  isOptionsText = false,
  textLevelOptions = ["value1", "value2"],
  step = 1,
  min = 0,
  max = 2,
  marks = true,
  flex,
  sliderProps,
}) => {
  const { control, errors } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const currentIndex =
          textLevelOptions.indexOf(field?.value) < 0
            ? 0
            : textLevelOptions.indexOf(field?.value);

        const handleChange = (_, newIndex) => {
          const newValue = textLevelOptions[newIndex];
          field.onChange(newValue);
          field.onBlur();
        };
        return (
          <Stack flex={flex || 1}>
            <LabelWrapper
              id={name}
              label={label}
              hasError={!!errors?.[name]}
              error={errors?.[name]?.message}
            >
              <Slider
                {...sliderProps}
                aria-label="importance-level"
                value={currentIndex}
                onChange={handleChange}
                step={step}
                min={min}
                max={max}
                marks={
                  isOptionsText
                    ? textLevelOptions.map((label, index) => ({
                        value: index,
                        label: label.toUpperCase(),
                      }))
                    : marks
                }
                valueLabelDisplay="auto"
                valueLabelFormat={
                  isOptionsText ? (i) => textLevelOptions[i] : (i) => i
                }
                sx={{
                  color: "primary.dark",
                  "& .MuiSlider-track": {
                    height: 10, // Make the track thicker
                  },
                  "& .MuiSlider-thumb": {
                    width: 24, // Make the thumb bigger
                    height: 24, // Make the thumb bigger
                    backgroundColor: "primary.dark", // Customize thumb color
                  },
                  "& .MuiSlider-rail": {
                    height: 2, // Adjust rail height as well
                  },
                }}
              />
            </LabelWrapper>
          </Stack>
        );
      }}
    />
  );
};

export default ControlledSlider;
