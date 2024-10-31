import React, { useState } from "react";
import ControlledTextField from "../../components/controlled/ControlledTextField";
import { Controller, useForm } from "react-hook-form";
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
import loginSchema from "../../schemas/loginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import FormWrapper from "../../wrappers/FormWrapper";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TextFieldError from "../../components/controlled/TextFieldError";

const LoginForm = ({ setFormData }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

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
    setFormData(data);
  };

  return (
    <FormWrapper formMethods={formMethods}>
      <form noValidate>
        <Box width="100%">
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
        <Box height="2.5rem" />
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          sx={{ bgcolor: (theme) => theme.palette.accent.dark }}
        >
          login
        </Button>
      </form>
    </FormWrapper>
  );
};

export default LoginForm;
