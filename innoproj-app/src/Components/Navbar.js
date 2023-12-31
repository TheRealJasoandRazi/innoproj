import React from "react";
import {
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  ThemeProvider,
  MenuItem,
  Menu,
  Typography,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import HiveSharpIcon from "@mui/icons-material/HiveSharp";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { createTheme } from "@mui/material/styles";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useCart } from "../Contexts/CartContext";
import { useUser } from "../Contexts/UserContext";

const NavBar = () => {
  const { userData } = useUser();

  // Create a custom theme
  const theme = createTheme({
    palette: {
      primary: {
        main: "#00041e", // Dark blue color
      },
      secondary: {
        main: "rgb(75, 0, 130)", // Light pink color
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
    console.log(userData);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        color="primary"
        sx={{
          //Add box shadow to the bottom of the element
          boxShadow: "0px 2.0rem 2.5rem rgba(0, 0, 0, 1)",
        }}
      >
        <Toolbar>
          {/* Logo */}
          <IconButton
            href="/"
            edge="start"
            color="inherit"
            aria-label="logo"
            sx={{ p: "0.5rem" }}
          >
            <HiveSharpIcon
              sx={{
                fontSize: 55,
                fill: "indigo",
                outline: "1px solid black",
                borderRadius: "10%",
              }}
            />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={2}>
            {/* Market Place Icon */}
            <IconButton
              href="/market-place"
              aria-label="market-place"
              variant="outlined"
              disabled={!userData.isLoggedIn}
            >
              <StorefrontIcon />
            </IconButton>
            {/* Shopping Cart */}
            <IconButton
              href="/cart"
              aria-label="cart"
              sx={{
                border: "1px solid black",
                borderRadius: "10%",
                bgcolor: "#00063fbb",
                pl: "0.75rem",
                pr: "0.75rem",
              }}
              disabled={!userData.isLoggedIn}
            >
              <ShoppingCartIcon />
              <Typography variant="h8" sx={{ pl: "0.5rem" }}>
                {userData.isLoggedIn ? cart.quantity : ""}
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
                href="/login"
                style={{ textDecoration: "none", color: "inherit" }}
                hidden={userData.isLoggedIn}
              >
                <MenuItem onClick={handleClose} disableRipple>
                  <LoginIcon />
                  Login
                </MenuItem>
              </a>
              <a
                href="/transactions"
                style={{ textDecoration: "none", color: "inherit" }}
                hidden={!userData.isLoggedIn}
              >
                <MenuItem onClick={handleClose} disableRipple>
                  <MonetizationOnIcon />
                  Transactions
                </MenuItem>
              </a>
              <a
                href="/logout"
                style={{ textDecoration: "none", color: "inherit" }}
                hidden={!userData.isLoggedIn}
              >
                <MenuItem onClick={handleClose} disableRipple>
                  <LogoutIcon />
                  Logout
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
