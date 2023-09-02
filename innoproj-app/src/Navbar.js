import React from "react";
import {
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import HiveSharpIcon from "@mui/icons-material/HiveSharp";
import SearchIcon from "@mui/icons-material/Search";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#303F9F", // Dark blue color
    },
    secondary: {
      main: "#FF4081", // Light pink color
    },
    divider: "#ffffff", // White color for the divider (outline)
  },
});

const NavBar = () => {
  let cartCount = 10;

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton href="/" edge="start" color="inherit" aria-label="logo">
            <HiveSharpIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={2}>
            <form>
              <TextField
                id="search-bar"
                className="text"
                onInput={(e) => {
                  console.log(e.target.value);
                }}
                label={<span>Search for an asset..</span>}
                variant="outlined"
                placeholder="Search..."
                size="small"
                color="secondary"
                sx={{ borderColor: "white" }}
              />
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </form>
            <IconButton
              href="/market-place"
              aria-label="market-place"
              variant="outlined"
            >
              <StorefrontIcon />
            </IconButton>
            <IconButton aria-label="cart" sx={{border: "1px solid lightblue", borderRadius: "10%", bgcolor: "darkblue"}}>
              <ShoppingCartIcon />
              <Typography variant="h8" sx={{pl: "0.5rem"}}>{cartCount}</Typography>
            </IconButton>
            <IconButton aria-label="profile">
              <AccountCircleIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavBar;
