import { useState } from "react";
import {
  Container,
  Box,
  Stack,
  Typography,
  ImageList,
  ImageListItemBar,
  ImageListItem,
  CssBaseline,
  ThemeProvider,
  createTheme,
  IconButton,
} from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import { useNavigate } from "react-router-dom";
import WatchList from "./WatchList";
import darkTheme from "../Themes/DarkTheme";

const Home = () => {
  let userBalance = 100;
  const navigate = useNavigate();

  const handleImageClick = (imageSrc, imageTitle) => {
    navigate("/asset?param=" + imageSrc + "," + imageTitle);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Container fixed sx={{ bgcolor: "#1f1f2f" }}>
          <Box sx={{ pt: "10px" }}>
            <Box sx={{ mb: "10px", borderBottom: "2px solid white" }}>
              <Typography variant="h6">Balance: {userBalance}$</Typography>
            </Box>
            <Box sx={{ mb: "10px", borderBottom: "2px solid white" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Most Popular Assets
              </Typography>
              <Stack spacing={0} direction="row" sx={{ overflowX: "auto" }}>
                <ImageList
                  sx={{
                    width: "100vw", // Set a fixed width to determine the visible images
                    display: "flex",
                    flexDirection: "row",
                  }}
                  rowHeight={400}
                >
                  {itemData.map((item) => (
                    <ImageListItem
                      key={item.img}
                      sx={{
                        flex: "0 0 auto", // Allow the item to shrink but not grow
                        maxWidth: "25%", // Set the maximum width of each item
                        overflowY: "hidden",
                        margin: "0", // Add some spacing between items
                        height: "100vh",
                        "&:hover": {
                          border: "1px solid indigo",
                        },
                      }}
                      onClick={() => handleImageClick(item.img, item.title)}
                    >
                      <img
                        src={`${item.img}?w=200&h=250&fit=crop&auto=format&dpr=2`}
                        alt={item.title}
                        loading="lazy"
                        onClick={() => {}}
                      />
                      <ImageListItemBar
                        title={
                          <span style={{ color: "white", fontWeight: "bold" }}>
                            {item.title}
                          </span>
                        }
                        subtitle={
                          <span style={{ color: "white", whiteSpace: "wrap" }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat quis sapiente incidunt dolore dolorem officiis sunt est eius atque.
                          </span>
                        }
                        sx={{ height: "35%" }}
                      ></ImageListItemBar>
                    </ImageListItem>
                  ))}
                </ImageList>
              </Stack>
            </Box>
            <Box
              sx={{ mb: "10px", borderBottom: "2px solid white", pb: "10px" }}
            >
              <Typography variant="h6">About Us: </Typography>
              <Typography>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Perferendis quis eligendi odio, consequuntur dolorum debitis
                praesentium aspernatur neque ad? Et rem esse eum quibusdam?
                Minus consequuntur cumque eum nemo quas. Repellat, deserunt
                possimus? Perspiciatis laudantium aliquam hic dolores nisi quis
                nesciunt laborum quidem praesentium provident fugit accusantium
                odio dignissimos tenetur, rem excepturi vitae. Inventore numquam
                deleniti suscipit sint, harum animi. Porro et nesciunt dolore
                natus fugit earum quo placeat tenetur, laboriosam magni unde
                provident ea aut eaque enim assumenda voluptas dolores iure
                velit debitis. Reprehenderit, iste! Voluptatum sunt excepturi
                perspiciatis. Dolores incidunt praesentium soluta. Esse neque
                tenetur alias molestias totam voluptatum, error quia sapiente
                aperiam eos, nobis expedita necessitatibus adipisci dicta.
                Repudiandae dolor consectetur incidunt facilis dignissimos
                laborum architecto quo. Doloremque, quo quae ipsa debitis quia
                assumenda molestias, laudantium eius adipisci dolor, aspernatur
                maxime iusto architecto inventore velit aut voluptatibus. Earum
                nesciunt adipisci facilis. Soluta tenetur aliquam quae
                perspiciatis sequi?
              </Typography>
              <Typography variant="h6" sx={{ mt: "10px" }}>
                FAQ Page:{" "}
                <IconButton href="/faq" aria-label="faq page button">
                  <QuizIcon sx={{ fontSize: 30 }}></QuizIcon>
                </IconButton>
              </Typography>
            </Box>
            <Typography variant="h6">WatchList: </Typography>
            <Typography variant="h6">
              <WatchList />
            </Typography>
          </Box>
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default Home;

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0",
    title: "Dark Sky",
  },
  {
    img: "https://images.unsplash.com/photo-1431440869543-efaf3388c585",
    title: "Thunder",
  },
  {
    img: "https://images.unsplash.com/photo-1516410529446-2c777cb7366d",
    title: "Road",
  },
  {
    img: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e",
    title: "Mountains",
  },
  {
    img: "https://images.unsplash.com/photo-1468657988500-aca2be09f4c6",
    title: "Waves",
  },
  {
    img: "https://images.unsplash.com/photo-1535868463750-c78d9543614f",
    title: "Light Blub",
  },
  {
    img: "https://images.unsplash.com/photo-1509023464722-18d996393ca8",
    title: "Fukishima",
  },
  {
    img: "https://images.unsplash.com/photo-1494587351196-bbf5f29cff42",
    title: "Underground Railway",
  },
  {
    img: "https://images.unsplash.com/photo-1492112007959-c35ae067c37b",
    title: "Fire Flower",
  },
  {
    img: "https://images.unsplash.com/photo-1476370648495-3533f64427a2",
    title: "Dark Skull",
  },
  {
    img: "https://images.unsplash.com/photo-1476842634003-7dcca8f832de",
    title: "Leaves",
  },
  {
    img: "https://images.unsplash.com/photo-1542887800-faca0261c9e1",
    title: "Hands",
  },
];
