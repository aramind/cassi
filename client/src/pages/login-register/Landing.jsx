import { Box, Button, Stack, Typography } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import React from "react";
import BodyContainer from "../../containers/BodyContainer";

const Landing = () => {
  return (
    <BodyContainer>
      <Stack width={{ xs: "100%", md: "500px" }} className=" centered ">
        <Box
          position="relative"
          width={{ xs: "220px", md: "300px" }}
          height={{ xs: "220px", md: "300px" }}
          className="centered "
          borderRadius="50%"
          bgcolor={(theme) => theme.palette.accent.light}
          mx="auto"
          mb={2}
        >
          <Box
            component="img"
            src={`/assets/images/welcome2.png`}
            alt="hero-image"
            width={{ xs: "100vw", md: "auto" }}
            height={{ xs: "auth", md: "30vh" }}
            sx={{
              position: "absolute",
              objectFit: "cover",
            }}
          />
        </Box>
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
