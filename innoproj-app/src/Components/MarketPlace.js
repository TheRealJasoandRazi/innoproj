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
} from "@mui/material";
import darkTheme from "../Themes/DarkTheme";
import itemData from "../Data/ImageArray";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate, Link } from "react-router-dom";

const MarketPlace = () => {
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
            pt: "10px"
          }}
        >
          <Box sx={{borderBottom: "0.25rem solid indigo", pb: "0.5rem"}}>
            <Typography variant="h3">Marketplace</Typography>
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
                      title={"$" + Math.floor(Math.random() * 1000)}
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
