import {
  Container,
  Box,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import darkTheme from "../Themes/DarkTheme";

const WishList = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
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
              backgroundColor: "primary.dark",
              "&:hover": {
                backgroundColor: "primary.main",
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <h3>There are no assets pinned to display</h3>
          </Box>
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default WishList;
