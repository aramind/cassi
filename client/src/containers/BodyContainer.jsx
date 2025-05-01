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
      p={{ xs: 1, md: 2 }}
      alignItems="center"
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        justifyContent: justifyContent || "center",
      }}
    >
      {withTopBar && <TopBar />}
      {withInfoIcon && (
        <Stack width={1} direction="row" justifyContent="flex-end" spacing={1}>
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
