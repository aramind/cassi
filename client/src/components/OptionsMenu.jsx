import { Box, Menu, MenuItem } from "@mui/material";
import React, { cloneElement, useState } from "react";

const OptionsMenu = ({ button, menuItems, width = 1, disabled = false }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        MenuListProps={{
          "aria-labelledby": "options-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {Array?.isArray(menuItems) &&
          menuItems?.map((item) => (
            <MenuItem
              key={item.label}
              onClick={() => {
                item.onClick();
                handleClose();
              }}
            >
              {item.label}
            </MenuItem>
          ))}
      </Menu>
    </Box>
  );
};

export default OptionsMenu;
