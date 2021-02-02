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
  },
  typography: {
    button: {
      textTransform: "none",
      fontSize: "12px",
      fontWeight: "200",
    },
  },
});
