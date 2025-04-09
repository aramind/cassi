import React from "react";
import BodyContainer from "../../containers/BodyContainer";
import { Button, Stack, Typography } from "@mui/material";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import { useNavigate } from "react-router-dom";

const FutureFeaturePage = () => {
  const navigate = useNavigate();
  return (
    <BodyContainer justifyContent="flex-start" withTopBar={true}>
      <Stack
        spacing={0.5}
        width={1}
        justifyContent="center"
        alignItems="center"
        flex={1}
      >
        <Typography variant="h5" color="error" textAlign="center" width={1}>
          Oops!
        </Typography>
        <Typography variant="h6" textAlign="center" width={1}>
          You're a bit early — we're still building this feature!{" "}
          <BuildRoundedIcon fontSize="inherit" />
        </Typography>
        <br />
        <Button
          variant="contained"
          startIcon={<ReplyRoundedIcon />}
          onClick={() => navigate(-1)}
        >
          Go back
        </Button>
      </Stack>

      <br />
    </BodyContainer>
  );
};

export default FutureFeaturePage;
