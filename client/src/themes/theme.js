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
    main: "#f8f9fa",
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

const headerStyles = {
  fontFamily: `"Montserrat Alternates", "Palanquin", "Roboto", sans-serif`,
  fontWeight: "bold",
};

const subHeaderStyles = {
  fontFamily: `"Poppins", "Roboto", sans-serif`,
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
    h1: {
      fontSize: "4rem",
      [`@media (min-width:600px)`]: {
        fontSize: "3.8rem",
      },
      [`@media (min-width:960px)`]: {
        fontSize: "4rem",
      },
      ...headerStyles,
    },
    h2: {
      fontSize: "2rem",
      [`@media (min-width:600px)`]: {
        fontSize: "1.8rem",
      },
      [`@media (min-width:960px)`]: {
        fontSize: "2rem",
      },
      ...subHeaderStyles,
    },
    h3: {
      fontSize: "3rem",
      [`@media (min-width:600px)`]: {
        fontSize: "2.8rem",
      },
      [`@media (min-width:960px)`]: {
        fontSize: "3rem",
      },
      ...headerStyles,
    },
    h4: {
      fontSize: "2rem",
      [`@media (min-width:600px)`]: {
        fontSize: "1.8rem",
      },
      [`@media (min-width:960px)`]: {
        fontSize: "2rem",
      },
      ...subHeaderStyles,
    },
    h5: {
      fontSize: "2rem",
      [`@media (min-width:600px)`]: {
        fontSize: "1.8rem",
      },
      [`@media (min-width:960px)`]: {
        fontSize: "2rem",
      },
      ...headerStyles,
    },
    h6: {
      fontSize: "1rem",
      ...subHeaderStyles,
      [`@media (min-width:600px)`]: {
        fontSize: "0.9rem",
      },
      [`@media (min-width:960px)`]: {
        fontSize: "1rem",
      },
    },
    body1: {
      fontFamily: `"Palanquin", "Nunito Sans", "Roboto", sans-serif`,
      fontSize: "0.9rem",
      [`@media (min-width:600px)`]: {
        fontSize: "0.9rem",
      },
      [`@media (min-width:960px)`]: {
        fontSize: "1rem",
      },
    },
    body2: {
      fontFamily: `"Palanquin", "Nunito Sans", "Roboto", sans-serif`,
      fontSize: "0.7rem",
      [`@media (min-width:600px)`]: {
        fontSize: "0.7rem",
      },
      [`@media (min-width:960px)`]: {
        fontSize: "0.8rem",
      },
    },
    accent: {
      fontFamily: `"Nunito Sans", "Roboto", sans-serif`,
      fontSize: "0.9rem",
      [`@media (min-width:600px)`]: {
        fontSize: "0.9rem",
      },
      [`@media (min-width:960px)`]: {
        fontSize: "1rem",
      },
    },
    smallText: {
      fontFamily: `"Inter", sans-serif`,
      fontSize: "0.8rem",
    },
    narrowText: {
      fontFamily: `"Abel", sans-serif`,
      fontSize: "0.8rem",
    },

    subtitle2: {
      fontSize: "0.8rem",
      [`@media (min-width:960px)`]: {
        fontSize: "0.9rem",
      },
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h1",
          h2: "h2",
          h3: "h3",
          h4: "h4",
          h5: "h5",
          h6: "h6",
          body1: "body1",
          body2: "body2",
          accent: "span",
          smallText: "span",
          narrowText: "span",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "Poppins",
        },
      },
    },
  },
});

export default main;
