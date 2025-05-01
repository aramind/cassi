import { Box, IconButton, Stack } from "@mui/material";
import React from "react";
import TopBar from "../components/TopBar";
import { InfoIcon } from "../utils/muiIcons";

const BodyContainer = ({
  justifyContent,
  withTopBar = true,
  withInfoIcon = false,
  children,
}) => {
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
      {withInfoIcon && (
        <Stack
          width={1}
          // className="outlined"
          direction="row"
          justifyContent="flex-end"
          spacing={1}
        >
          <IconButton color="info" disabled>
            {" "}
            <InfoIcon />
          </IconButton>
        </Stack>
      )}
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
