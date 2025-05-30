import { Box, Button, IconButton, Menu, Stack } from "@mui/material";
import React, { cloneElement, useState } from "react";
import FilterSwitchGroup from "../../components/FilterSwitchGroup";

import { OPTIONS_FOR_FILTERS } from "../../constants/tasks";
import { XIcon } from "../../utils/muiIcons";

const FILTERS = {
  type: {
    label: "type",
    options: OPTIONS_FOR_FILTERS.type,
  },
  priority: {
    label: "priority",
    options: OPTIONS_FOR_FILTERS.priority,
  },
  isCompleted: {
    label: "completed",
    options: OPTIONS_FOR_FILTERS.isCompleted,
  },
  isRecurring: {
    label: "recurring",
    options: OPTIONS_FOR_FILTERS.isRecurring,
  },
};
const FilterOptionsMenu = ({
  button,
  menuItems,
  width = 1,
  disabled = false,
  filters,
  setFilters,
  handleSelectAllFilters,
  handleResetFilters,
  onClick,
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
        onClick: (e) => {
          if (button.props.onClick) button.props.onClick(e); // original
          else handleClick(e); // fallback
        },
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
        <Box px={2} py={1}>
          <Stack
            direction="row"
            justifyContent="space-between"
            width="auto"
            mb={1}
          >
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                size="small"
                onClick={handleSelectAllFilters}
              >
                select all
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={handleResetFilters}
              >
                reset filters
              </Button>
            </Stack>

            <IconButton onClick={handleClose}>
              <XIcon color="error" />
            </IconButton>
          </Stack>
          <Box px={3}>{options}</Box>
        </Box>
      </Menu>
    </Box>
  );
};

export default FilterOptionsMenu;
