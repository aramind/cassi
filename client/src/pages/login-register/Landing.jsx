import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

const Landing = () => {
  return (
    <Box
      minHeight="100vh"
      minWidth="100vw"
      bgcolor={(theme) => theme.palette.myWhite.main}
      p={{ xs: 1, md: 2 }}
      className=" centered"
    >
      <Stack width={{ xs: "100%", md: "500px" }} className=" centered ">
        <Box
          component="img"
          src={`/assets/images/welcome.png`}
          alt="hero-image"
          width={{ xs: "100vw", md: "auto" }}
          height={{ xs: "auth", md: "30vh" }}
          sx={{
            objectFit: "cover",
          }}
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
              bgcolor: (theme) => theme.palette.accent.light,
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
    </Box>
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
