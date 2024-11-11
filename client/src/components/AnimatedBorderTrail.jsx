// components/AnimatedBorderTrail.js

import React from "react";
import { Box } from "@mui/material";

const sizes = {
  sm: 5,
  md: 10,
  lg: 20,
};

function AnimatedBorderTrail({
  duration = "10s",
  trailColor = "purple",
  trailSize = "md",
  contentClassName,
  children,
}) {
  // Inline style to control the animation
  const trailAnimationStyle = {
    animation: `trailAnimation ${duration} linear infinite`,
    // background: `conic-gradient(from var(--angle, 0deg) at 50% 50%, transparent ${
    //   100 - sizes[trailSize]
    // }%, ${trailColor})`,
    background: trailColor,
  };

  return (
    <Box
      position="relative"
      display="inline-flex"
      overflow="hidden"
      borderRadius="5px"
      //   bgcolor="grey.200"
      width={1}
      //   className="outlined"
      p={0.5}
      style={{
        "--angle": "0deg",
      }}
    >
      {/* Rotating border trail layer */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        style={trailAnimationStyle}
      />

      {/* Inner content area */}
      <Box
        position="relative"
        overflow="hidden"
        borderRadius="4px"
        p={1}
        className={contentClassName}
        width={1}
        sx={{ bgcolor: (theme) => theme.palette.myWhite.main }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default AnimatedBorderTrail;
