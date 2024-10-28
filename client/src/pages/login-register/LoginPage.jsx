import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import loginSchema from "../../schemas/loginSchema";
import FormWrapper from "../../wrappers/FormWrapper";
import BodyContainer from "../../containers/BodyContainer";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import HeroImage from "./HeroImage";
import ControlledTextField from "../../components/controlled/ControlledTextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TextFieldError from "../../components/controlled/TextFieldError";
import { NavLink } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(loginSchema),
  });

  const formMethods = {
    control,
    handleSubmit,
    errors,
  };

  const onSubmit = (data) => {
    alert("submitting...");
    console.log("Submitting ", data);
  };

  //   onClickHandlers

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormWrapper formMethods={formMethods}>
      <form noValidate>
        <BodyContainer>
          <Stack width={{ xs: "90%", md: "500px" }} className=" centered ">
            <HeroImage
              bgcolor={(theme) => theme.palette.accent.light}
              width={{ xs: "150px", md: "300px" }}
              height={{ xs: "150px", md: "300px" }}
              src={`/assets/images/login.png`}
              imageWidth={`70vw`}
            />
            <Typography variant="smallHeader">Welcome back!</Typography>

            <Typography variant="smallSubHeader" textAlign="center">
              Your assistant is ready --- let’s get back to managing your casa!
            </Typography>
            <br />
            <Box width={1}>
              <ControlledTextField
                name="homeName"
                label="Apartment/Unit/House Name as username"
              />
              <Controller
                name="password"
                render={({ field }) => (
                  <Stack>
                    <TextField
                      {...field}
                      // value={field.value}
                      id="password"
                      label="Password"
                      // variant="outlined"
                      size="small"
                      fullWidth
                      error={!!errors?.password}
                      type={showPassword ? "text" : "password"}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleClickShowPassword}>
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                    <TextFieldError
                      errorMessage={errors?.password?.message || ""}
                    />
                  </Stack>
                )}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(e) => setChecked(e.target?.checked)}
                    sx={{
                      "& .MuiCheckbox-root": { padding: 0 },
                    }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ ml: "8px" }}>
                    Keep me logged in
                  </Typography>
                }
              />
            </Box>
            <br />
            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              sx={{ bgcolor: (theme) => theme.palette.accent.dark }}
            >
              login
            </Button>
            <Stack
              direction="row"
              width={1}
              spacing={1}
              justifyContent="space-between"
              alignItems="center"
              mt={1}
            >
              <Typography variant="smallText">
                Don't have an account?
              </Typography>
              <NavLink to="/register">Register</NavLink>
            </Stack>
          </Stack>
        </BodyContainer>
      </form>
    </FormWrapper>
  );
};

export default LoginPage;
