import { createTheme } from "@mui/material";

// Create a custom dark theme using Material-UI's createTheme function
const darkTheme = createTheme({
  // Define the color palette for the theme
  palette: {
    // Set the mode to "dark" for a dark mode theme
    mode: "dark",
    // Define the primary color as a shade of gray
    primary: {
      main: "#474752",
    },
    // Define the secondary color as a light pink color
    secondary: {
      main: "rgb(75, 0, 130)",
    },
    danger: {
      main: "red",
    },
    // Define background colors
    background: {
      // Default background color for the entire application
      default: "#21212f",
      // Background color for paper elements (like cards)
      paper: "#1e1e1e",
      // Background color for boxes (specified as white)
      box: "white",
    },
  },
  // Define typography styles
  typography: {
    // Apply white color to all text variants
    allVariants: {
      color: "white",
    },
  },
});

// Export the dark theme object for use in your application
export default darkTheme;
