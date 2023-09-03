import { Container, Box, CssBaseline, ThemeProvider } from "@mui/material";
import darkTheme from "../Themes/DarkTheme";

const WishList = () => {
  return (
    // ThemeProvider provides the dark theme for the component
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        {" "}
        {/* CssBaseline for resetting default styles */}
        <Container
          sx={{
            pt: "20px",
            pb: "20px",
            px: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "50vh",
              backgroundColor: "primary.dark", // Background color using the dark theme's primary color
              "&:hover": {
                backgroundColor: "primary.main", // Background color on hover using the dark theme's primary color
                opacity: [0.9, 0.8, 0.7], // Opacity transitions on hover
              },
            }}
          >
            <h3>There are no assets pinned to display</h3>{" "}
            {/* Message displayed */}
          </Box>
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default WishList;
