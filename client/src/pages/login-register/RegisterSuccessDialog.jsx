import React from "react";
import DraggableDialog from "../../components/DraggableDialog";

import {
  Button,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const RegisterSuccessDialog = ({ open, handleClose }) => {
  const navigate = useNavigate();

  return (
    <DraggableDialog
      open={open}
      handleClose={handleClose}
      title="Registration Successful!"
    >
      <DialogContent>
        <Typography textAlign="center" fontSize="2rem">
          🥳🎉🎊
        </Typography>
        <Typography textAlign="center">
          <Typography
            color="primary.dark"
            textTransform="uppercase"
            fontWeight="bold"
            textAlign="center"
            component="span"
          >
            Welcome aboard
          </Typography>{" "}
          — you’re all set to use your account.
        </Typography>
        <br />
        <Typography textAlign="center">Proceed to login?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>later</Button>
        <Button
          onClick={() => {
            navigate("/login");
            handleClose();
          }}
          variant="outlined"
        >
          now
        </Button>
      </DialogActions>
    </DraggableDialog>
  );
};

export default RegisterSuccessDialog;
