import { Box, Menu, Stack } from "@mui/material";
import React, { cloneElement, useState } from "react";
import FilterSwitchGroup from "../../components/FilterSwitchGroup";
import { OPTIONS_FOR_FILTERS } from "../../constants/tasks";

const FILTERS = {
  type: {
    label: "type",
    options: OPTIONS_FOR_FILTERS.TYPE,
  },
  priority: {
    label: "priority",
    options: OPTIONS_FOR_FILTERS.PRIORITY,
  },
  isCompleted: {
    label: "completed",
    options: OPTIONS_FOR_FILTERS.ISCOMPLETED,
  },
  isRecurring: {
    label: "recurring",
    options: OPTIONS_FOR_FILTERS.ISRECURRING,
  },
};
const FilterOptionsMenu = ({
  button,
  menuItems,
  width = 1,
  disabled = false,
  filters,
  setFilters,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = Object.keys(filters)?.map((option) => (
    <FilterSwitchGroup
      key={option?.label}
      label={FILTERS[option]?.label}
      options={FILTERS[option]?.options}
      filterKey={option}
      filters={filters}
      setFilters={setFilters}
    />
  ));
  return (
    <Box width={width}>
      {cloneElement(button, {
        onClick: handleClick,
        disabled: disabled,
        ariaControls: open ? "basic-menu" : undefined,
        ariaHaspopup: "true",
        ariaExpanded: open ? "true" : undefined,
      })}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "options-button" }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box p={2}>{options}</Box>
      </Menu>
    </Box>
  );
};

export default FilterOptionsMenu;
