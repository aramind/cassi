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
    <FormControl component="fieldset" variant="standard" sx={{ mb: 2 }}>
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup row>
        {options?.map((option) => (
          <FormControlLabel
            key={option.toString()}
            control={
              <Switch
                checked={filters[filterKey].includes(option)}
                onChange={() => handleToggle(option)}
              />
            }
            label={option.toString()}
          />
        ))}
      </FormGroup>
      FilterSwitchGroup
    </FormControl>
  );
};

export default FilterSwitchGroup;
