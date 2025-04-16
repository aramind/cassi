import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Button } from "@mui/material";

const Xbutton = ({ handleClose }) => {
  return (
    <Button variant="text" onClick={handleClose} color="error">
      <CloseRoundedIcon />
    </Button>
  );
};

export default Xbutton;
