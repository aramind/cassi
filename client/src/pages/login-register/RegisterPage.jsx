import React, { useState } from "react";
import BodyContainer from "../../containers/BodyContainer";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import HeroImage from "./HeroImage";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "../../schemas/registerSchema";
import FormWrapper from "../../wrappers/FormWrapper";
import ControlledTextField from "../../components/controlled/ControlledTextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TextFieldError from "../../components/controlled/TextFieldError";

const RegisterPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(registerSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
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
              bgcolor={(theme) => theme.palette.primary.light}
              width={{ xs: "220px", md: "300px" }}
              height={{ xs: "220px", md: "300px" }}
              src={`/assets/images/register.png`}
            />
            <Typography variant="mediumHeader">Get Started!</Typography>
            <br />
            <Typography variant="smallSubHeader" textAlign="center">
              Sign up and start managing with ease!
            </Typography>
            <br />
            <Box width={1}>
              <ControlledTextField name="email" label="Email" />
              <ControlledTextField
                name="homeName"
                label="Apartment/Unit/House Name"
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
            </Box>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit(onSubmit)}
            >
              register
            </Button>
          </Stack>
        </BodyContainer>
      </form>
    </FormWrapper>
  );
};

export default RegisterPage;
