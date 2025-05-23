import React, { useState } from "react";
import BodyContainer from "../../containers/BodyContainer";
import { Box, Stack, Typography } from "@mui/material";
import HeroImage from "./HeroImage";
import NavigateLink from "./NavigateLink";
import LoginRegisterForm from "./LoginRegisterForm";
import useApiSend from "../../hooks/api/useApiSend";
import useRootReq from "../../hooks/api/public/useRootReq";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../LoadingPage";
import RegisterSuccessDialog from "./RegisterSuccessDialog";
import useAlerts from "../../hooks/useAlerts";
import RMSolutions from "../../components/RMSolutions";
import LargeScreenHeroImage from "./LargeScreenHeroImage";

const LoginRegisterPage = ({ action }) => {
  const [openRegisterSuccessDialog, setOpenRegisterSuccessDialog] =
    useState(false);
  const { login, signup } = useRootReq({ isPublic: true, showAck: true });

  const { showAutoHideAlert } = useAlerts();
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const { mutate: sendLogin, isLoading } = useApiSend(
    login,
    ["house"],
    (data) => {
      setAuth((pv) => data?.data);
      data?.success && navigate("/dashboard");
      showAutoHideAlert("Log in successful.", "success", 3000);
    }
  );

  const { mutate: sendSignUp, isLoadingSignUp } = useApiSend(
    signup,
    ["house"],
    () => {
      setOpenRegisterSuccessDialog(true);
    }
  );

  const values = {
    color: action === "login" ? "accent" : "primary",
    headerText: action === "login" ? "Welcome Back!" : "Get Started!",
    subText:
      action === "login"
        ? "Your assistant is ready --- let’s get back to managing your casa!"
        : "Sign up and start managing with ease!",
    cbText:
      action === "login"
        ? "Keep me logged in"
        : "I agree to the processing of my personal data provided",
    navigateTo: action === "login" ? "register" : "login",
  };

  const defaultValues = {
    color: (theme) => theme.palette.primary.light,
  };

  if (isLoading || isLoadingSignUp) {
    return <LoadingPage />;
  }
  return (
    <BodyContainer withTopBar={false} withInfoIcon={true}>
      <Stack direction={{ xs: "column", md: "row" }} width={1} height={1}>
        <LargeScreenHeroImage />
        <Stack
          width={{ xs: "90%", md: "500px" }}
          className="centered"
          mx="auto"
          my="auto"
          px={{ xs: 0, md: 2 }}
          height={1}
        >
          <Box flex={1} display={{ xs: "none", md: "block" }} />
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <HeroImage
              bgcolor={(theme) =>
                theme.palette[values?.color]?.light || defaultValues.color
              }
              width={{ xs: "150px", md: "300px" }}
              height={{ xs: "150px", md: "300px" }}
              src={`/assets/images/${action}.png`}
              imageWidth={`70vw`}
            />
          </Box>
          <Box width={1}>
            <Typography variant="h3" textAlign="center">
              {values.headerText}
            </Typography>
            <Typography variant="h6" textAlign="center">
              {values?.subText}
            </Typography>
            <br />
            <Box width={1}>
              <LoginRegisterForm
                action={action}
                buttonColor={values?.color}
                sendLogin={sendLogin}
                sendSignUp={sendSignUp}
              />
            </Box>
          </Box>
          <NavigateLink to={values?.navigateTo} />
          <Box flex={1} />
          <RMSolutions />
        </Stack>
      </Stack>
      <RegisterSuccessDialog
        open={openRegisterSuccessDialog}
        handleClose={() => setOpenRegisterSuccessDialog(false)}
      />
    </BodyContainer>
  );
};

export default LoginRegisterPage;
