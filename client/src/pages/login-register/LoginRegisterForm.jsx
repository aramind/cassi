import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import registerSchema from "../../schemas/registerSchema";
import loginSchema from "../../schemas/loginSchema";
import FormWrapper from "../../wrappers/FormWrapper";
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
import ControlledTextField from "../../components/controlled/ControlledTextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TextFieldError from "../../components/controlled/TextFieldError";
import useAuth from "../../hooks/useAuth";

const LoginRegisterForm = ({ action, buttonColor, sendSignUp, sendLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { persist, setPersist } = useAuth();

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(action === "login" ? loginSchema : registerSchema),
  });

  const formMethods = {
    control,
    handleSubmit,
    errors,
  };

  const onSubmit = (data) => {
    if (action === "login") {
      sendLogin({ data });
    } else {
      sendSignUp({ data });
    }
  };

  return (
    <FormWrapper formMethods={formMethods}>
      <form noValidate>
        <Box width="100%">
          {action === "register" && (
            <ControlledTextField name="email" label="Email" />
          )}
          <ControlledTextField
            name="name"
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
                            {showPassword ? <Visibility /> : <VisibilityOff />}
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
        <Box width="100%" mt="-1.5rem">
          <FormControlLabel
            control={
              <Checkbox
                checked={persist}
                onChange={(e) => setPersist(e.target?.checked)}
                sx={{
                  "& .MuiCheckbox-root": { padding: 0 },
                }}
              />
            }
            label={
              <Typography variant="body2" sx={{ ml: "8px" }}>
                {action === "login"
                  ? "Keep me logged in"
                  : "I agree to the processing of my personal data provided"}
              </Typography>
            }
          />
        </Box>
        <Box height="2.5rem" />
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          sx={{
            bgcolor: (theme) => theme.palette[buttonColor]?.dark,
          }}
        >
          {action}
        </Button>
      </form>
    </FormWrapper>
  );
};

export default LoginRegisterForm;
