import { Typography } from "@mui/material";
import HeroImage from "../pages/login-register/HeroImage";

const NothingImage = ({ text }) => {
  return (
    <>
      <br />
      <Typography mb={2} variant="h6" color="secondary" textAlign="center">
        {text || "It’s a bit quiet here..."}
      </Typography>
      <HeroImage
        bgcolor={(theme) => theme.palette?.primary.main}
        width={{ xs: "150px", md: "300px" }}
        height={{ xs: "150px", md: "300px" }}
        src={`/assets/images/nothing.png`}
        imageWidth={`70vw`}
      />
    </>
  );
};

export default NothingImage;
