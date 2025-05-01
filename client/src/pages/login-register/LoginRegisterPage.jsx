import React from "react";
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
import useMinorAlert from "../../hooks/useMinorAlert";

const LoginRegisterPage = ({ action }) => {
  const { login, signup } = useRootReq({ isPublic: true, showAck: true });
  const { showAlert } = useMinorAlert();
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const { mutate: sendLogin, isLoading } = useApiSend(
    login,
    ["house"],
    (data) => {
      setAuth((pv) => data?.data);
      data?.success && navigate("/dashboard");
      showAlert("Log in successful.", "success", 3000);
    }
  );

  const { mutate: sendSignUp, isLoadingSignUp } = useApiSend(
    signup,
    ["house"],
    () => {
      alert("Signup successful. Please wait for approval.");
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
      <Stack
        width={{ xs: "90%", md: "500px" }}
        className="centered"
        mx="auto"
        my="auto"
      >
        <HeroImage
          bgcolor={(theme) =>
            theme.palette[values?.color]?.light || defaultValues.color
          }
          width={{ xs: "150px", md: "300px" }}
          height={{ xs: "150px", md: "300px" }}
          src={`/assets/images/${action}.png`}
          imageWidth={`70vw`}
        />
        <Typography variant="h3">{values.headerText}</Typography>
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
        <NavigateLink to={values?.navigateTo} />
      </Stack>
    </BodyContainer>
  );
};

export default LoginRegisterPage;
