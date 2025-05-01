import React from "react";
import { Box } from "@mui/material";
import { styled, keyframes } from "@mui/system";

// Constants
const DURATION = "1.5s";
const CONTAINER_SIZE = "250px";
const BOX_SIZE = "33px";
const BOX_BORDER_RADIUS = "15%";

// Animations
const slide = keyframes`
  0% { transform: translateX(0vw); }
  100% { transform: translateX(calc(${CONTAINER_SIZE} - (${BOX_SIZE} * 1.25))); }
`;

const colorChange = keyframes`
  0% { background-color: #1795ff; }
  100% { background-color: #23d3fb; }
`;

const flip = (delay = 0) => keyframes`
  0%, ${15 + delay}% { transform: rotate(0); }
  ${35 + delay}%, 100% { transform: rotate(-180deg); }
`;

const squidge = (offset) => keyframes`
  ${offset + 5}% {
    transform-origin: center bottom;
    transform: scaleX(1) scaleY(1);
  }
  ${offset + 15}% {
    transform-origin: center bottom;
    transform: scaleX(1.3) scaleY(0.7);
  }
  ${offset + 25}%, ${offset + 20}% {
    transform-origin: center bottom;
    transform: scaleX(0.8) scaleY(1.4);
  }
  ${offset + 55}%, 100% {
    transform-origin: center top;
    transform: scaleX(1) scaleY(1);
  }
  ${offset + 40}% {
    transform-origin: center top;
    transform: scaleX(1.3) scaleY(0.7);
  }
`;

// Styled Components
const Container = styled(Box)({
  width: CONTAINER_SIZE,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "relative",
});

const BoxWrapper = styled(Box)(({ theme, index }) => {
  const colors = ["#9fb3a6", "#9fb3a6", "#e57373", "#81c784", "#ffb74d"];
  const backgroundColor = colors[index] || "#23d3fb";

  const animationMap = [
    {
      animation: `${slide} ${DURATION} ease-in-out infinite alternate`,
      afterAnimation: `${colorChange} ${DURATION} ease-in-out infinite alternate`,
    },
    {
      animation: `${flip(0)} ${DURATION} ease-in-out infinite alternate`,
      afterAnimation: `${squidge(
        0
      )} ${DURATION} ease-in-out infinite alternate`,
    },
    {
      animation: `${flip(15)} ${DURATION} ease-in-out infinite alternate`,
      afterAnimation: `${squidge(
        15
      )} ${DURATION} ease-in-out infinite alternate`,
    },
    {
      animation: `${flip(30)} ${DURATION} ease-in-out infinite alternate`,
      afterAnimation: `${squidge(
        30
      )} ${DURATION} ease-in-out infinite alternate`,
    },
    {
      animation: `${flip(45)} ${DURATION} ease-in-out infinite alternate`,
      afterAnimation: `${squidge(
        45
      )} ${DURATION} ease-in-out infinite alternate`,
    },
  ];

  return {
    width: BOX_SIZE,
    height: BOX_SIZE,
    position: "relative",
    display: "block",
    transformOrigin: "-50% center",
    borderRadius: BOX_BORDER_RADIUS,
    animation: animationMap[index]?.animation || "none",

    "&::after": {
      content: "''",
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      right: 0,
      backgroundColor,
      borderRadius: BOX_BORDER_RADIUS,
      boxShadow: "0px 0px 10px 0px rgba(28, 159, 255, 0.4)",
      animation: animationMap[index]?.afterAnimation || "none",
    },
  };
});

const AnimatedLoader = () => {
  return (
    <Container>
      {[0, 1, 2, 3, 4].map((i) => (
        <BoxWrapper key={i} index={i} />
      ))}
    </Container>
  );
};

export default AnimatedLoader;
