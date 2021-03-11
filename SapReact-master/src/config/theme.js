import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#187ce2",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#4bacef",
    },
    error: {
      light: "#EC4134",
      main: "#EC4134",
      dark: "#EC4134",
    },
    // status: {
    //   danger: "#EC4134",
    // },
    // success: {
    //   main: "#00B526",
    // },
    // error: {
    //   main: "#EC4134",
    // },
  },
  typography: {
    button: {
      textTransform: "none",
      fontSize: "12px",
      fontWeight: "200",
    },
  },
});
