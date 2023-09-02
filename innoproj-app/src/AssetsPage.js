import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  ThemeProvider,
  CssBaseline,
  createTheme,
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Stack,
  IconButton,
  Icon,
  Button
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

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

  const [itemCount, setCount] = useState(0);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Container fixed sx={{ bgcolor: "#1f1f2f" }}>
          <Grid container spacing={2} sx={{ mt: "10px" }}>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <Box
                component="img"
                sx={{
                  aspectRatio: "16/9",
                }}
                alt={paramValuesArray[1]}
                src={
                  paramValuesArray[0] +
                  "?w=250&h=350&fit=crop&auto=format&dpr=2"
                }
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <Stack direction={"column"} gap={3}>
                <IconButton
                  sx={{ borderRadius: "0", justifyContent: "flex-start" }}
                >
                  <AccountCircleIcon
                    edge="start"
                    sx={{ fontSize: 50, mr: "0.5rem" }}
                  />
                  <Typography variant="h4">Account Name</Typography>
                </IconButton>
                <Typography variant="h4">{paramValuesArray[1]}</Typography>
                <Typography variant="h8">
                  Keywords: Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Ipsum, dolor assumenda. Recusandae ab illum natus
                  ratione obcaecati porro architecto distinctio molestiae qui
                  rerum inventore dolore harum, minus aspernatur temporibus
                  officiis?
                </Typography>
                <Typography variant="h6">
                  Price: 1000$
                </Typography>
                <Stack direction={"row"} gap={2}>
                  <IconButton onClick={() => setCount(itemCount + 1)}>
                    <AddIcon />
                  </IconButton>
                  <Typography variant="h5">QTY: {itemCount}</Typography>
                  <IconButton onClick={() => setCount(itemCount - 1)}>
                    <RemoveIcon />
                  </IconButton>
                </Stack>
                <Button variant="contained" size="large" color="secondary">Add To Cart</Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default AssetsPage;
