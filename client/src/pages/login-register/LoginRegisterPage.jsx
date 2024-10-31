import React, { useState } from "react";
import BodyContainer from "../../containers/BodyContainer";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import HeroImage from "./HeroImage";
import LoginForm from "./LoginForm";
import NavigateLink from "./NavigateLink";

const LoginRegisterPage = ({ action }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState({});

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
  };
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const defaultValues = {
    color: (theme) => theme.palette.primary.light,
  };
  return (
    <BodyContainer>
      <Stack width={{ xs: "90%", md: "500px" }} className=" centered ">
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
          <LoginForm setFormData={setFormData} />
        </Box>

        <NavigateLink to={action} />
      </Stack>
    </BodyContainer>
  );
};

export default LoginRegisterPage;
