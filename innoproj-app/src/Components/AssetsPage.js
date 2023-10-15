import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  ThemeProvider,
  CssBaseline,
  createTheme,
  Container,
  Box,
  Typography,
  Grid,
  Stack,
  IconButton,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
  const { addItemToCart, removeItemFromCart_ID } = useCart();
  const location = useLocation();
  const queryString = new URLSearchParams(location.search);
  const encodedData = queryString.get("param");
  const [Image, setImage] = useState({
    Account_ID: 0,
    Asset_ID: 0,
    Image: "",
    Keywords: "",
    Price: 0.0,
    Rarity: 0.0,
    Username: "",
    Wallet_Address: "",
  });

  const setData = (data) => {
    setImage({
      Account_ID: parseInt(data.data[0].Account_ID),
      Asset_ID: parseInt(data.data[0].Asset_ID),
      Image: data.data[0].Image,
      Keywords: data.data[0].Keywords,
      Price: parseFloat(data.data[0].Price),
      Rarity: parseFloat(data.data[0].Rarity),
      Username: data.data[0].Username,
      Wallet_Address: data.data[0].Wallet_Address,
    });
  };

  const getImage = (ID) => {
    fetch(`http://127.0.0.1:4000/assets/${ID}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getRarity = (rarity) => {
    if (rarity <= 0.04608) {
      return "Common";
    } else if (rarity > 0.04608 && rarity <= 0.02458) {
      return "Uncommon";
    }
    return "Rare";
  };

  const changeColor = (rarity) => {
    if (rarity <= 0.04608) {
      return "blue";
    } else if (rarity > 0.04608 && rarity <= 0.02458) {
      return "purple";
    }
    return "gold";
  };

  useEffect(() => getImage(parseInt(encodedData, 10)), []);

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
                  width: "100%",
                  height: "auto",
                  aspectRatio: "1/1",
                  boxShadow: "0 0 2.5rem rgba(0, 0, 0, 0.75)", // Add a box shadow here
                  border: "4px solid",
                  borderColor: changeColor(Image.Rarity),
                }}
                alt={require(`../Data/NFTs/${Image.Asset_ID}.json`).title}
                src={require(`../Data/NFTs/${Image.Asset_ID}.svg`)}
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
                  <Typography variant="h4">{Image.Username}</Typography>
                </IconButton>
                <Typography variant="h4">
                  {require(`../Data/NFTs/${Image.Asset_ID}.json`).title}
                </Typography>
                <Typography variant="h8">Tags: {Image.Keywords}</Typography>
                <Typography variant="h6">Price: {Image.Price} ETH</Typography>
                <Typography
                  variant="h6"
                  sx={{ color: changeColor(Image.Rarity) }}
                >
                  Rarity: {getRarity(Image.Rarity)} Grade
                </Typography>
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
                    addItemToCart(Image); // Call addItemToCart from useCart
                  }}
                >
                  Add To Cart
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    fontSize: "1rem",
                    width: "fit-content",
                    p: "0.75rem",
                    color: "magenta",
                    borderColor: "magenta",
                    "&:hover": {
                      borderColor: "red",
                      color: "red",
                    },
                  }}
                  onClick={() => {
                    removeItemFromCart_ID(Image.Asset_ID);
                  }}
                >
                  Remove From Cart
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
