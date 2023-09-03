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
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart } from "../Contexts/CartContext";

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
  const encodedData = queryString.get("param");

  const { addItemToCart } = useCart();

  let decodedData = { img: "", title: "" };

  if (encodedData) {
    // Decode the data and parse it back to a JavaScript object
    decodedData = JSON.parse(decodeURIComponent(encodedData));
  }

  const [itemCount, setCount] = useState(0);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Container
          fixed
          sx={{
            bgcolor: "#1f1f2f",
            pt: "10px",
            boxShadow: "0rem 0.0rem 5em rgba(0, 0, 0, 1)",
          }}
        >
          <Grid container spacing={2} sx={{ mt: "10px", height: "100vh" }}>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <Box
                component="img"
                sx={{
                  aspectRatio: "16/9",
                  boxShadow: "0 0 2.5rem rgba(0, 0, 0, 0.75)", // Add a box shadow here
                }}
                alt={decodedData.title}
                src={
                  decodedData.img + "?w=250&h=350&fit=crop&auto=format&dpr=2"
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
                <Typography variant="h4">{decodedData.title}</Typography>
                <Typography variant="h8">
                  Keywords: Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Ipsum, dolor assumenda. Recusandae ab illum natus
                  ratione obcaecati porro architecto distinctio molestiae qui
                  rerum inventore dolore harum, minus aspernatur temporibus
                  officiis?
                </Typography>
                <Typography variant="h6">
                  Price: {decodedData.price.toLocaleString()} $
                </Typography>
                <Stack direction={"row"} gap={0}>
                  <IconButton
                    onClick={() => setCount(itemCount + 1)}
                    sx={{
                      border: "1px solid magenta",
                      borderRadius: "0",
                      borderRight: "none",
                    }}
                  >
                    <AddIcon sx={{ fill: "magenta" }} />
                  </IconButton>
                  <Typography
                    variant="h6"
                    sx={{
                      border: "1px solid magenta",
                      borderRadius: "0",
                      p: "0.75rem",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    QTY: {itemCount}
                  </Typography>
                  <IconButton
                    onClick={() => setCount(itemCount - 1)}
                    sx={{
                      border: "1px solid magenta",
                      borderRadius: "0",
                      borderLeft: "none",
                    }}
                  >
                    <RemoveIcon sx={{ fill: "magenta" }} />
                  </IconButton>
                </Stack>
                <Button
                  variant="outlined"
                  sx={{
                    fontSize: "1rem",
                    width: "fit-content",
                    p: "0.75rem",
                    color: "magenta",
                    borderColor: "magenta",
                    "&:hover": {
                      borderColor: "lightblue",
                      color: "lightblue",
                    },
                  }}
                  onClick={() => {
                    // Add items to the cart using addItemToCart
                    const item = {
                      name: { title: decodedData.title, src: decodedData.img }, // Use imgTitle
                      price: decodedData.price,
                      qty: itemCount,
                    };
                    addItemToCart(item); // Call addItemToCart from useCart
                  }}
                >
                  Add To Cart |{" "}
                  {(decodedData.price * itemCount).toLocaleString()} $ |
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default AssetsPage;
