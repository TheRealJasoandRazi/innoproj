import { useState } from "react";
import {
  Container,
  Box,
  Stack,
  Typography,
  CssBaseline,
  ThemeProvider,
  createTheme,
  IconButton,
} from "@mui/material";
import darkTheme from "./DarkTheme";

const Transactions = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Container fixed sx={{ bgcolor: "#1f1f2f" }}>
          <Box sx={{ height: "100vh", pt: "10px" }}></Box>
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default Transactions;
