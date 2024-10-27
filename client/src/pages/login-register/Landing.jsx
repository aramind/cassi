import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import BodyContainer from "../../containers/BodyContainer";
import HeroImage from "./HeroImage";

const ActionButton = ({ bgcolor, sxProps, text, onClickHandler }) => {
  return (
    <Button
      variant="contained"
      disableElevation
      sx={{
        bgcolor: bgcolor || "primary",
        width: "160px",
        ...sxProps,
      }}
    >
      {text}
    </Button>
  );
};

const Landing = () => {
  return (
    <BodyContainer>
      <Stack width={{ xs: "100%", md: "500px" }} className=" centered ">
        <HeroImage
          bgcolor={(theme) => theme.palette.accent.light}
          width={{ xs: "220px", md: "300px" }}
          height={{ xs: "220px", md: "300px" }}
          src={`/assets/images/welcome2.png`}
        />
        <Typography variant="largeHeader" sx={{ ...localStyles.title }}>
          CASSI
        </Typography>
        <Typography variant="smallText">
          Convenient Assistant for Space Sharing Interactions
        </Typography>
        <Box height="3rem"></Box>
        <Typography
          variant="subHeader"
          textAlign="center"
          sx={{ ...localStyles.text }}
        >
          <b>Manage your home here!</b> — keep track of everything, right at
          your fingertips.
        </Typography>
        <Box height="3rem"></Box>
        <Stack direction="row">
          <ActionButton
            text="register"
            sxProps={{
              zIndex: "20",
              ":hover": {
                bgcolor: (theme) => theme.palette.primary.dark,
              },
            }}
          />
          <ActionButton
            text="login"
            bgcolor={(theme) => theme.palette.accent.main}
            sxProps={{
              zIndex: "21",
              ":hover": {
                bgcolor: (theme) => theme.palette.accent.dark,
              },
            }}
          />
        </Stack>
      </Stack>
    </BodyContainer>
  );
};

export default Landing;

const localStyles = {
  title: {
    color: (theme) => theme.palette.primary.dark,
  },
  text: {
    fontSize: "1rem",
  },
};
