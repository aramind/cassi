import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
} from "@mui/material";
import React from "react";

const FilterSwitchGroup = ({
  label,
  options,
  filterKey,
  filters,
  setFilters,
}) => {
  const handleToggle = (option) => {
    const current = filters[filterKey];
    const isSelected = current.includes(option);
    const updated = isSelected
      ? current.filter((item) => item !== option)
      : [...current, option];

    setFilters((prev) => ({
      ...prev,
      [filterKey]: updated,
    }));
  };
  return (
    <FormControl component="fieldset" variant="standard" sx={{ mb: 2, mr: 2 }}>
      <FormLabel component="legend" sx={{ fontWeight: "bold" }}>
        {label.toUpperCase()}
      </FormLabel>
      <FormGroup>
        {options?.map((option) => (
          <FormControlLabel
            key={option.toString()}
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "0.8rem",
              },
            }}
            control={
              <Switch
                checked={filters[filterKey].includes(option)}
                onChange={() => handleToggle(option)}
                size="small"
              />
            }
            label={option.toString()?.toUpperCase()}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default FilterSwitchGroup;
