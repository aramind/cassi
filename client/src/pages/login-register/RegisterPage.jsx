import React from "react";
import BodyContainer from "../../containers/BodyContainer";
import { Button, Stack, Typography } from "@mui/material";
import HeroImage from "./HeroImage";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "../../schemas/registerSchema";
import FormWrapper from "../../wrappers/FormWrapper";
import ControlledTextField from "../../components/controlled/ControlledTextField";

const RegisterPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(registerSchema),
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
            <Stack spacing={1} width={1}>
              <ControlledTextField name="email" label="Email" />
              <ControlledTextField
                name="homeName"
                label="Apartment/Unit/House Name"
              />
            </Stack>
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
