import {
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
  Stack,
  MenuItem,
  Select,
  Pagination,
  Button,
  Input,
} from "@mui/material";
import darkTheme from "../Themes/DarkTheme";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useUser } from "../Contexts/UserContext";
import { useEffect } from "react";

const MarketPlace = () => {
  const [inputValue, setInputValue] = useState("");
  const { userData } = useUser();
  const [background, setBackground] = useState("");
  const [head, setHead] = useState("");
  const [eye, setEye] = useState("");
  const [ears, setEars] = useState("");
  const [hair, setHair] = useState("");
  const [mouth, setMouth] = useState("");
  const [nose, setNose] = useState("");
  const [sortPrice, setSortPrice] = useState("a");
  const [sortRarity, setSortRarity] = useState("d");

  const getImages = () => {
    fetch("http://127.0.0.1:4000/assets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startIndex: 1,
        count: 3840,
        id: userData.id,
        sortPrice: sortPrice,
        sortRarity: sortRarity,
        background: background,
        head: head,
        hair: hair,
        eye: eye,
        nose: nose,
        mouth: mouth,
        ears: ears,
        keywords: inputValue.split(" "),
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        DisplayNewImages(data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => getImages(), []);

  const handleSearch = (evt) => {
    setInputValue(evt.target.value);

    getImages();
  };

  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [rows, setRows] = useState([
    {
      Asset_ID: 0,
      Price: "",
      Keywords: "",
      Image: "",
      Rarity: "",
      title: "",
    },
  ]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [page, setPage] = useState(0);
  const [jumpToPage, setJumpToPage] = useState(1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleJumpToPage = () => {
    const pageNumber = parseInt(jumpToPage, 10);
    if (pageNumber >= 1 && pageNumber <= Math.ceil(rows.length / rowsPerPage)) {
      setPage(pageNumber - 1); // Adjust for 0-based index
    }
  };

  function changeColor(rarity) {
    if (rarity <= 0.04608) {
      return "blue";
    } else if (rarity > 0.04608 && rarity <= 0.02458) {
      return "purple";
    }
    return "gold";
  }

  function DisplayNewImages(imgs) {
    let itemData = [];
    itemData.push(
      imgs.map((i) => {
        const title = require(`../Data/NFTs/${i.Asset_ID}.json`).title;
        return { ...i, title: title };
      })
    );
    setRows(...itemData);
  }

  const handleSortPrice = (event) => {
    setSortPrice(event.target.value);
    getImages();
  };

  const handleSortRarity = (event) => {
    setSortRarity(event.target.value);
    getImages();
  };

  const handleChangeBackground = (event) => {
    setBackground(event.target.value);
    getImages();
  };

  const handleChangeHead = (event) => {
    setHead(event.target.value);
    getImages();
  };

  const handleChangeEye = (event) => {
    setEye(event.target.value);
    getImages();
  };

  const handleChangeEars = (event) => {
    setEars(event.target.value);
    getImages();
  };

  const handleChangeNose = (event) => {
    setNose(event.target.value);
    getImages();
  };

  const handleChangeMouth = (event) => {
    setMouth(event.target.value);
    getImages();
  };

  const handleChangeHair = (event) => {
    setHair(event.target.value);
    getImages();
  };

  const navigate = useNavigate();

  const handleImageClick = (item) => {
    navigate(`/asset?param=${item.Asset_ID}`);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Box
          sx={{
            bgcolor: "#1f1f2f",
            boxShadow: "0rem 0.0rem 5em rgba(0, 0, 0, 1)",
            pt: "10px",
            minHeight: "92vh",
            maxWidth: "90vw",
            mx: "auto",
            px: "1.5rem",
            borderLeft: "4px solid black",
            borderRight: "4px solid black",
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
                  onChange={(evt) => handleSearch(evt)}
                  id="outlined-adornment-amount"
                  label="Amount"
                  sx={{ borderColor: "indigo !important" }}
                />
              </FormControl>
            </Stack>
            <Box sx={{ minWidth: 120, mt: 2 }}>
              <Stack direction={"row"} gap={2}>
                <form onSubmit={(e) => e.preventDefault()}>
                  <FormControl
                    sx={{ width: "fit-content", minWidth: "6.75vw" }}
                  >
                    <InputLabel id="bkc-select">Background</InputLabel>
                    <Select
                      labelId="bkc-select"
                      value={background}
                      label="Background"
                      onChange={handleChangeBackground}
                    >
                      <MenuItem value={""}>&#8205;</MenuItem>
                      <MenuItem value={"red"}>Red</MenuItem>
                      <MenuItem value={"blue"}>Blue</MenuItem>
                      <MenuItem value={"green"}>Green</MenuItem>
                      <MenuItem value={"orange"}>Orange</MenuItem>
                      <MenuItem value={"gold"}>Gold</MenuItem>
                      <MenuItem value={"purple"}>Purple</MenuItem>
                      <MenuItem value={"pink"}>Pink</MenuItem>
                      <MenuItem value={"yellow"}>Yellow</MenuItem>
                    </Select>
                  </FormControl>
                </form>
                <FormControl sx={{ width: "fit-content", minWidth: "6.75vw" }}>
                  <InputLabel id="hd-select">Head</InputLabel>
                  <Select
                    labelId="hd-select"
                    value={head}
                    label="Head"
                    onChange={handleChangeHead}
                  >
                    <MenuItem value={""}>&#8205;</MenuItem>
                    <MenuItem value={"handsome"}>Handsome</MenuItem>
                    <MenuItem value={"ugly"}>Ugly</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ width: "fit-content", minWidth: "6.75vw" }}>
                  <InputLabel id="hir-select">Hair</InputLabel>
                  <Select
                    labelId="hir-select"
                    value={hair}
                    label="Hair"
                    onChange={handleChangeHair}
                  >
                    <MenuItem value={""}>&#8205;</MenuItem>
                    <MenuItem value={"curly"}>Curly</MenuItem>
                    <MenuItem value={"straight"}>Straight</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ width: "fit-content", minWidth: "6.75vw" }}>
                  <InputLabel id="eye-select">Eye</InputLabel>
                  <Select
                    labelId="eye-select"
                    value={eye}
                    label="Eye"
                    onChange={handleChangeEye}
                  >
                    <MenuItem value={""}>&#8205;</MenuItem>
                    <MenuItem value={"angry"}>Angry</MenuItem>
                    <MenuItem value={"normal"}>Nuetrel</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ width: "fit-content", minWidth: "6.75vw" }}>
                  <InputLabel id="nose-select">Nose</InputLabel>
                  <Select
                    labelId="nose-select"
                    value={nose}
                    label="Nose"
                    onChange={handleChangeNose}
                  >
                    <MenuItem value={""}>&#8205;</MenuItem>
                    <MenuItem value={"pointy"}>Pointy</MenuItem>
                    <MenuItem value={"normal"}>Regular</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ width: "fit-content", minWidth: "6.75vw" }}>
                  <InputLabel id="mouth-select">Mouth</InputLabel>
                  <Select
                    labelId="mouth-select"
                    value={mouth}
                    label="Mouth"
                    onChange={handleChangeMouth}
                  >
                    <MenuItem value={""}>&#8205;</MenuItem>
                    <MenuItem value={"neutrel"}>Nuetrel</MenuItem>
                    <MenuItem value={"sad"}>Sad</MenuItem>
                    <MenuItem value={"sick"}>Sick</MenuItem>
                    <MenuItem value={"smirk"}>Smirk</MenuItem>
                    <MenuItem value={"surprised"}>Surprised</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ width: "fit-content", minWidth: "6.75vw" }}>
                  <InputLabel id="ears-select">Ears</InputLabel>
                  <Select
                    labelId="ears-select"
                    value={ears}
                    label="Ears"
                    onChange={handleChangeEars}
                  >
                    <MenuItem value={""}>&#8205;</MenuItem>
                    <MenuItem value={"pointy"}>Pointy</MenuItem>
                    <MenuItem value={"regular"}>Regular</MenuItem>
                    <MenuItem value={"round"}>Round</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  sx={{ width: "fit-content", minWidth: "6.75vw", ml: "auto" }}
                >
                  <InputLabel id="price-select">Sort Price</InputLabel>
                  <Select
                    labelId="price-select"
                    value={sortPrice}
                    label="Price"
                    onChange={handleSortPrice}
                  >
                    <MenuItem value={"a"}>Ascending</MenuItem>
                    <MenuItem value={"d"}>Descending</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ width: "fit-content", minWidth: "6.75vw" }}>
                  <InputLabel id="rarity-select">Sort Rarity</InputLabel>
                  <Select
                    labelId="rarity-select"
                    value={sortRarity}
                    label="Rarity"
                    onChange={handleSortRarity}
                  >
                    <MenuItem value={"a"}>Ascending</MenuItem>
                    <MenuItem value={"d"}>Descending</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Box>
          </Box>
          <Box>
            <ImageList
              gap={8}
              sx={{
                mb: 8,
                gridTemplateColumns: "1fr 1fr 1fr 1fr!important",
              }}
            >
              {rows
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((item) => (
                  <Card key={item.Asset_ID}>
                    <ImageListItem
                      key={item.Asset_ID}
                      sx={{
                        "&:hover": {
                          border: "2px solid indigo",
                        },
                      }}
                      className="purple"
                      onClick={() => handleImageClick(item)}
                    >
                      <ImageListItemBar
                        sx={{
                          background: "rgba(0,0,0,0.75)",
                        }}
                        title={
                          <span
                            className={changeColor(parseFloat(item.Rarity))}
                          >
                            {`${item.Price} ETH`}
                          </span>
                        }
                        actionIcon={
                          <Tooltip title={"owner"} sx={{ mr: "5px" }}>
                            <AccountCircleIcon />
                          </Tooltip>
                        }
                        position="top"
                      />
                      <img
                        src={require(`../Data/NFTs/${item.Asset_ID}.svg`)}
                        alt={item.title}
                        style={{
                          width: "100%",
                          height: "auto",
                          aspectRatio: "2.75 / 3",
                        }}
                        loading="lazy"
                        onClick={() => {}}
                      />
                      <ImageListItemBar
                        title={
                          <span
                            className={changeColor(parseFloat(item.Rarity))}
                          >
                            {item.title}
                          </span>
                        }
                        sx={{
                          background: "black",
                        }}
                      />
                    </ImageListItem>
                  </Card>
                ))}
            </ImageList>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Pagination
                count={Math.ceil(rows.length / rowsPerPage)}
                page={page + 1}
                onChange={handleChangePage}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Input
                type="number"
                value={jumpToPage}
                onChange={(e) => setJumpToPage(e.target.value)}
                inputProps={{
                  min: 1,
                  max: Math.ceil(rows.length / rowsPerPage),
                }}
              />
              <Button variant="outlined" onClick={handleJumpToPage}>
                Go to Page
              </Button>
            </Box>
          </Box>
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default MarketPlace;
