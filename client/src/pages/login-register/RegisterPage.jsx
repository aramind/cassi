import React from "react";
import BodyContainer from "../../containers/BodyContainer";
import { Button, Stack, Typography } from "@mui/material";
import HeroImage from "./HeroImage";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "../../schemas/registerSchema";
import FormWrapper from "../../wrappers/FormWrapper";

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
          <Button fullWidth variant="contained">
            register
          </Button>
        </Stack>
      </BodyContainer>
    </FormWrapper>
  );
};

export default RegisterPage;
