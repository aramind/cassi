import { createTheme } from "@mui/material";

const COLORS = {
  primary: {
    dark: "#769381",
    main: "#9fb3a6",
    light: "#c6d2ca",
  },
  accent: {
    dark: "#e3b94e",
    main: "#f7d786",
    light: "#fbecc5",
  },
  myWhite: {
    dark: "#dbe0e6",
    main: "#f8f94a",
    light: "#ffffff",
  },
  myBlack: {
    dark: "#141414",
    main: "#212121",
    light: "#474747",
  },
  secondary: {
    dark: "#5c5c5c",
    main: "#909090",
    light: "#cccccc",
  },
  notification: {
    error: {
      dark: "#b71c1c",
      main: "#d32f2f",
      light: "#e57373",
    },
    success: {
      dark: "#2e7d32",
      main: "#388e3c",
      light: "#81c784",
    },
    warning: {
      dark: "#f57c00",
      main: "#ffa000",
      light: "#ffb74d",
    },
  },
};

// theme

const main = createTheme({
  palette: {
    primary: COLORS.primary,
    secondary: COLORS.secondary,
    accent: COLORS.accent,
    myBlack: COLORS.myBlack,
    myWhite: COLORS.myWhite,
    notification: COLORS.notification,
  },
  typography: {
    fontFamily: `"Palanquin", "Nunito Sans", "Roboto", sans-serif`,
    mainHeader: `"Montserrat Alternates", "Palanquin", "Roboto", sans-serif`,
    subHeader: `"Palanquin" , "Roboto", sans-serif`,
    text: `"Palanquin", "Nunito Sans", "Roboto", sans-serif`,
    accent: `"Poppins", "Roboto", sans-serif`,
    smallText: `"Inter", sans-serif`,
    narrowText: `"Abel", sans-serif`,
    body1: {
      fontSize: "0.9rem",
      [`@media (min-width:600px)`]: {
        fontSize: "0.9rem",
      },
      [`@media (min-width:960px)`]: {
        fontSize: "1rem",
      },
    },
    subtitle2: {
      fontSize: "0.8rem",
      [`@media (min-width:960px)`]: {
        fontSize: "0.9rem",
      },
    },
    h6: {
      fontSize: "1.1rem",
      [`@media (min-width:600px)`]: {
        fontSize: "1.1rem",
      },
      [`@media (min-width:960px)`]: {
        fontSize: "1.3rem",
      },
    },
    h5: {
      fontSize: "1.3rem",
      [`@media (min-width:600px)`]: {
        fontSize: "1.3rem",
      },
      [`@media (min-width:960px)`]: {
        fontSize: "1.5rem",
      },
    },
    h4: {
      fontSize: "1.5rem",
      [`@media (min-width:600px)`]: {
        fontSize: "1.5rem",
      },
      [`@media (min-width:960px)`]: {
        fontSize: "2rem",
      },
    },
  },
});

export default main;
