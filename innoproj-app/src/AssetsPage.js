import React from "react";
import { useLocation } from "react-router-dom";
import {
  ThemeProvider,
  CssBaseline,
  createTheme,
  Container,
  Box,
  Typography,
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

const AssetsPage = () => {
  const location = useLocation();
  const queryString = new URLSearchParams(location.search);
  const paramValue = queryString.get("param"); 

  let paramValuesArray;

  if (paramValue) {
    paramValuesArray = paramValue.split(","); 
    console.log("Param values:", paramValuesArray);
    
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Container fixed sx={{ bgcolor: "#1f1f2f" }}>
          <Box sx={{ height: "100vh", pt: "10px" }}>
            <Typography sx={{mb: 5}} variant="h3">{paramValuesArray[1]}:</Typography>
            <Box
              component="img"
              sx={{
                aspectRatio: "16/9",
              }}
              alt={paramValuesArray[1]}
              src={
                paramValuesArray[0] + "?w=300&h=300&fit=crop&auto=format&dpr=2"
              }
            />
          </Box>
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default AssetsPage;
