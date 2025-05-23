import { IconButton, Stack } from "@mui/material";
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
      p={{ xs: 1, md: 0 }}
      alignItems="center"
      sx={{
        height: "100vh",
        width: "100%",
        justifyContent: justifyContent || "center",
        overflowX: "hidden",
      }}
    >
      {withTopBar && <TopBar />}
      {withInfoIcon && (
        <Stack
          width={1}
          direction="row"
          justifyContent="flex-end"
          spacing={1}
          sx={{ display: { md: "none" } }}
        >
          <IconButton color="info" disabled>
            {" "}
            <InfoIcon />
          </IconButton>
        </Stack>
      )}
      {children}
    </Stack>
  );
};

export default BodyContainer;
