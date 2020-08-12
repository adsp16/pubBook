import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#DF5757",
      grey: "#EBEDEF",
    },
    secondary: {
      main: "#F4ECE8",
    },
    third: {
      main: "#6D6E71",
    },
    fourth: {
      main: "#D1D1D1",
    },
    darkGrey: {
      main: "#333333",
    },
    dark: {
      main: "#1A1A1A",
    },
    error: {
      main: "#ff0033",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    success: {
      main: "#4BB543",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
  },
  typography: {
    button: {
      textTransform: "capitalize",
      fontWeight: 400,
      fontSize: "1rem",
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
