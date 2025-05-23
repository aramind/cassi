import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { largeScreenHeroImages } from "../../constants/imageURLs";

const LargeScreenHeroImage = () => {
  const [currentImg, setCurrentImg] = useState(largeScreenHeroImages[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeout(() => {
        const randomIndex = Math.floor(
          Math.random() * largeScreenHeroImages?.length
        );
        setCurrentImg(largeScreenHeroImages[randomIndex]);
      }, 500);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box
      sx={{
        display: { xs: "none", md: "block" },
        objectFit: "cover",
      }}
      alt="hero-image"
      component="img"
      src={`/assets/images/home/${currentImg}`}
      height={1}
      flex={{ md: 2 }}
    />
  );
};

export default LargeScreenHeroImage;
