import React from "react";
import {
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  TextField,
  ThemeProvider,
  MenuItem,
  Menu,
  Typography,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import HiveSharpIcon from "@mui/icons-material/HiveSharp";
import SearchIcon from "@mui/icons-material/Search";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { createTheme } from "@mui/material/styles";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useCart } from "../Contexts/CartContext";

const NavBar = () => {
  // Create a custom theme
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

  // Create a styled menu using MUI styled components
  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === "light"
          ? "rgb(55, 65, 81)"
          : theme.palette.grey[300],
      backgroundColor: "black",
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  }));
  const { cart } = useCart();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // Function to handle the menu click
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to handle menu close
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary">
        <Toolbar>
          {/* Logo */}
          <IconButton href="/" edge="start" color="inherit" aria-label="logo">
            <HiveSharpIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={2}>
            {/* Search Bar */}
            <form>
              <Box sx={{ pt: "0.5rem" }}>
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
                <IconButton
                  sx={{ borderRadius: 0 }}
                  type="submit"
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Box>
            </form>
            {/* Market Place Icon */}
            <IconButton
              href="/market-place"
              aria-label="market-place"
              variant="outlined"
            >
              <StorefrontIcon />
            </IconButton>
            {/* Shopping Cart */}
            <IconButton
              aria-label="cart"
              sx={{
                border: "1px solid lightblue",
                borderRadius: "10%",
                bgcolor: "darkblue",
              }}
            >
              <ShoppingCartIcon />
              <Typography variant="h8" sx={{ pl: "0.5rem" }}>
                {cart.quantity}
              </Typography>
            </IconButton>
            {/* Profile Button */}
            <Button onClick={handleClick}>
              <IconButton aria-label="profile">
                <AccountCircleIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </Button>
            {/* Customized Menu */}
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <a
                href="/transactions"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem onClick={handleClose} disableRipple>
                  <MonetizationOnIcon />
                  Transactions
                </MenuItem>
              </a>
            </StyledMenu>
          </Stack>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavBar;
