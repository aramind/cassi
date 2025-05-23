import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import BodyContainer from "../../containers/BodyContainer";
import RMSolutions from "../../components/RMSolutions";
import HeroImage from "./HeroImage";
import { useNavigate } from "react-router-dom";
import LargeScreenHeroImage from "./LargeScreenHeroImage";

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
      onClick={() => onClickHandler()}
    >
      {text}
    </Button>
  );
};

const Landing = () => {
  const navigate = useNavigate();
  return (
    <BodyContainer
      withTopBar={false}
      withInfoIcon={true}
      justifyContent="flex-start"
    >
      <Stack direction={{ xs: "column", md: "row" }} width={1} height={1}>
        <LargeScreenHeroImage />
        <Stack
          width={{ xs: "100%", md: "500px" }}
          className=" centered"
          my="auto"
          px={{ xs: 0, md: 2 }}
          height={1}
        >
          <Box flex={1} display={{ xs: "none", md: "block" }} />
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <HeroImage
              bgcolor={(theme) => theme.palette.accent.light}
              width={{ xs: "220px", md: "300px" }}
              height={{ xs: "220px", md: "300px" }}
              src={`/assets/images/welcome2.png`}
            />
          </Box>
          <Typography variant="h1" sx={{ ...localStyles.title }}>
            CASSI
          </Typography>
          <Typography variant="h6" textAlign="center">
            Convenient Assistant for Space Sharing Interactions
          </Typography>
          <Box height="1.5rem"></Box>
          <Typography
            variant="h6"
            textAlign="center"
            sx={{ ...localStyles.text }}
          >
            <span>
              <b>Manage your home here!</b>
            </span>{" "}
            — keep track of everything, right at your fingertips.
          </Typography>
          <Box height="3rem"></Box>
          <Stack direction="row">
            <ActionButton
              text="register"
              bgcolor={(theme) => theme.palette.primary.main}
              sxProps={{
                zIndex: "20",

                ":hover": {
                  bgcolor: (theme) => theme.palette.primary.dark,
                  zIndex: "21",
                },
              }}
              onClickHandler={() => navigate("/register")}
            />
            <ActionButton
              text="login"
              bgcolor={(theme) => theme.palette.accent.main}
              sxProps={{
                marginLeft: "-2rem",
                zIndex: "19",

                ":hover": {
                  bgcolor: (theme) => theme.palette.accent.dark,
                  zIndex: "21",
                },
              }}
              onClickHandler={() => navigate("/login")}
            />
          </Stack>
          <Box flex={1} />
          <RMSolutions />
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
