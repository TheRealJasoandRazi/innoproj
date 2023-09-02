import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Container,
    Box,
    CssBaseline,
    ThemeProvider,
    createTheme,
    IconButton,
  } from "@mui/material";

const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#474752", // Replace with your desired primary color
      },
      background: {
        default: "#21212f", // Replace with your desired background color
        paper: "#1e1e1e",
        box: "white",
      },
    },
    typography: {
      allVariants: {
        color: "white", // Set all text to white
      },
    },
  });

  const WishList = () => {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline>
          <Container
            sx={{
              pt: '20px', 
              pb: '20px', 
              px: 0, 
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '50vh',
                backgroundColor: 'primary.dark',
                '&:hover': {
                  backgroundColor: 'primary.main',
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