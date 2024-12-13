import { Box, Stack } from "@mui/material";
import React from "react";
import TopBar from "../components/TopBar";

const BodyContainer = ({ justifyContent, withTopBar, children }) => {
  return (
    <Stack
      bgcolor={(theme) => theme.palette.myWhite.main}
      p={{ xs: 1, md: 2 }}
      alignItems="center"
      // className="outlined"
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        justifyContent: justifyContent || "center",
      }}
    >
      {withTopBar && <TopBar />}
      {children}
    </Stack>
    // <Box
    //   minHeight="100vh"
    //   minWidth="100vw"
    //   bgcolor={(theme) => theme.palette.myWhite.main}
    //   p={{ xs: 1, md: 2 }}
    //   className=" centered"
    // >
    //   {children}
    // </Box>
  );
};

export default BodyContainer;
