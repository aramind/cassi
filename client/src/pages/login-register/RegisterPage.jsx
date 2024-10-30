import React, { useState } from "react";
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
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "../../schemas/registerSchema";
import FormWrapper from "../../wrappers/FormWrapper";
import ControlledTextField from "../../components/controlled/ControlledTextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TextFieldError from "../../components/controlled/TextFieldError";
import NavigateLink from "./NavigateLink";

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
  const [agree, setAgree] = useState(false);
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
              width={{ xs: "150px", md: "300px" }}
              height={{ xs: "150px", md: "300px" }}
              src={`/assets/images/register.png`}
              imageWidth={`70vw`}
            />
            <Typography variant="h3">Get Started!</Typography>

            <Typography variant="h6" textAlign="center">
              Sign up and start managing with ease!
            </Typography>
            <br />
            <Box width={1}>
              <ControlledTextField name="email" label="Email" />
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
            </Box>
            <Box width="100%" mt="-1rem">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agree}
                    onChange={(e) => setAgree(e.target?.checked)}
                    sx={{
                      "& .MuiCheckbox-root": { padding: 0 },
                    }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ ml: "8px" }}>
                    I agree to the processing of my personal data provided
                  </Typography>
                }
              />
            </Box>
            <Box height="2.5rem" />
            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              sx={{ bgcolor: (theme) => theme.palette.primary.dark }}
            >
              register
            </Button>
            <NavigateLink to={"login"} />
          </Stack>
        </BodyContainer>
      </form>
    </FormWrapper>
  );
};

export default RegisterPage;
