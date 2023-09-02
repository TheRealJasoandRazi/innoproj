import { createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#474752",
    },
    background: {
      default: "#21212f",
      paper: "#1e1e1e",
      box: "white",
    },
  },
  typography: {
    allVariants: {
      color: "white",
    },
  },
});

export default darkTheme;