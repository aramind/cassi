import { Box } from "@mui/material";
import React from "react";

const HeroImage = ({ bgcolor, width, height, src, imageWidth = "100vw" }) => {
  return (
    <Box
      position="relative"
      width={width}
      height={height}
      className="centered "
      borderRadius="50%"
      bgcolor={bgcolor}
      mx="auto"
      mb={2}
    >
      <Box
        component="img"
        src={src}
        alt="hero-image"
        width={{ xs: imageWidth, md: "auto" }}
        height={{ xs: "auto", md: "30vh" }}
        sx={{
          position: "absolute",
          objectFit: "cover",
        }}
      />
    </Box>
  );
};

export default HeroImage;
