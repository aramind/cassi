import { Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";

const OptionsMenu = ({ text, menuItems }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        id="options-button"
        variant="text"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {text}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "options-button",
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
    </div>
  );
};

export default OptionsMenu;
