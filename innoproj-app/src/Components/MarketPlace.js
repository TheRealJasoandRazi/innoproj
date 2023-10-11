import {
  Container,
  Box,
  Typography,
  Card,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ThemeProvider,
  CssBaseline,
  Tooltip,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  Button,
  Stack,
  Menu,
  MenuItem,
} from "@mui/material";
import darkTheme from "../Themes/DarkTheme";
import { styled, alpha } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import itemData from "../Data/ImageArray";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const MarketPlace = () => {
  const [inputValue, setInputValue] = useState("");

  const updateInputValue = (evt) => {
    const input = evt.target.value;
    setInputValue(input);

    fetch("http://127.0.0.1:4000/InputValueTest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputValue }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

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

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Function to generate a fake username
  function generateFakeUsername() {
    const adjectives = [
      "Cool",
      "Funny",
      "Smart",
      "Clever",
      "Creative",
      "Silly",
      "Awesome",
      "Happy",
      "Gentle",
      "Mysterious",
    ];
    const nouns = [
      "Ninja",
      "Panda",
      "Unicorn",
      "Wizard",
      "Dragon",
      "Star",
      "Rocket",
      "Lion",
      "Tiger",
      "Phoenix",
    ];

    const randomAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

    const randomNumber = Math.floor(Math.random() * 100);

    const fakeUsername = `${randomAdjective}${randomNoun}${randomNumber}`;

    return fakeUsername;
  }

  const navigate = useNavigate();

  const handleImageClick = (item) => {
    const encodedData = encodeURIComponent(JSON.stringify(item));
    navigate(`/asset?param=${encodedData}`);
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Container
          fixed
          sx={{
            bgcolor: "#1f1f2f",
            boxShadow: "0rem 0.0rem 5em rgba(0, 0, 0, 1)",
            pt: "10px",
          }}
        >
          <Box sx={{ borderBottom: "0.25rem solid indigo", pb: "0.5rem" }}>
            <Typography variant="h3">Marketplace</Typography>
          </Box>
          <Box>
            <Stack direction={"row"} gap={2}>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Search
                </InputLabel>
                <OutlinedInput
                  value={inputValue}
                  onChange={(evt) => updateInputValue(evt)}
                  id="outlined-adornment-amount"
                  endAdornment={
                    <IconButton sx={{ borderRadius: "0" }}>
                      <SearchIcon sx={{ fill: "indigo" }} />
                    </IconButton>
                  }
                  label="Amount"
                  sx={{ borderColor: "indigo !important" }}
                />
              </FormControl>
            </Stack>
            <Box>
              <Button
                id="demo-customized-button"
                aria-controls={open ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
              >
                Sort By
              </Button>
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} disableRipple>
                  Ascending
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                  Descending
                </MenuItem>
              </StyledMenu>
            </Box>
          </Box>
          <Box>
            <ImageList
              gap={4}
              sx={{
                mb: 8,
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(280px, 1fr))!important",
              }}
            >
              {itemData.map((item) => (
                <Card key={item.id}>
                  <ImageListItem
                    key={item.id}
                    sx={{
                      "&:hover": {
                        border: "1px solid indigo",
                      },
                    }}
                    onClick={() => handleImageClick(item)}
                  >
                    <ImageListItemBar
                      sx={{
                        background:
                          "linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)",
                      }}
                      title={"$" + item.price.toLocaleString()}
                      actionIcon={
                        <Tooltip
                          title={generateFakeUsername()}
                          sx={{ mr: "5px" }}
                        >
                          <AccountCircleIcon />
                        </Tooltip>
                      }
                      position="top"
                    />
                    <img
                      src={`${item.img}?w=200&h=250&fit=crop&auto=format&dpr=2`}
                      alt={item.title}
                      loading="lazy"
                      onClick={() => {}}
                    />
                    <ImageListItemBar title={item.title} />
                  </ImageListItem>
                </Card>
              ))}
            </ImageList>
          </Box>
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default MarketPlace;
