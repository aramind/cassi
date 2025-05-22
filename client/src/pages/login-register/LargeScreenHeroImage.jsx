import { Box } from "@mui/material";
import React from "react";

const LargeScreenHeroImage = () => {
  return (
    <Box
      sx={{ display: { xs: "none", md: "block" }, objectFit: "cover" }}
      component="img"
      src="/assets/images/home/home5.jpg"
      height={1}
      flex={{ md: 2 }}
    />
  );
};

export default LargeScreenHeroImage;
