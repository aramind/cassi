import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import BodyContainer from "../../containers/BodyContainer";
import HeroImage from "./HeroImage";

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
        <Typography variant="mainHeader" sx={{ ...localStyles.title }}>
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
          <Button
            variant="contained"
            disableElevation
            sx={{
              width: "160px",
              zIndex: "20",
              ":hover": {
                bgcolor: (theme) => theme.palette.primary.dark,
              },
            }}
          >
            Register
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "160px",
              bgcolor: (theme) => theme.palette.accent.main,
              marginLeft: "-1rem",
              ":hover": {
                zIndex: "21",
                bgcolor: (theme) => theme.palette.accent.dark,
              },
            }}
            disableElevation
          >
            Login
          </Button>
        </Stack>
      </Stack>
    </BodyContainer>
  );
};

export default Landing;

const localStyles = {
  title: {
    fontSize: "5rem",
    color: (theme) => theme.palette.primary.dark,
  },
  text: {
    fontSize: "1rem",
  },
};
