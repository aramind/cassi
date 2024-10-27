import React from "react";
import BodyContainer from "../../containers/BodyContainer";
import { Button, Stack, Typography } from "@mui/material";
import HeroImage from "./HeroImage";

const RegisterPage = () => {
  return (
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
  );
};

export default RegisterPage;
