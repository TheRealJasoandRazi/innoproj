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
import NavBar from "./Navbar";
import QuizIcon from "@mui/icons-material/Quiz";
import { useNavigate } from "react-router-dom";
import WatchList from "./WatchList";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#474752",
    },
    background: {
      default: "#21212f",
      paper: "#1e1e1e",
      box: "white",
    },
  },
  typography: {
    allVariants: {
      color: "white",
    },
  },
});

const Home = () => {
  let userBalance = 100;
  const navigate = useNavigate();

  const handleImageClick = (imageSrc, imageTitle) => {
    navigate("/asset?param="+imageSrc+","+imageTitle);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Container fixed sx={{ bgcolor: "#1f1f2f" }}>
          <Box sx={{ height: "100vh", pt: "10px" }}>
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
                        "&:hover": {
                          border: "1px solid white",
                        },
                      }}
                      onClick={() => handleImageClick(item.img, item.title)}
                    >
                      <img
                        src={`${item.img}?w=200&h=200&fit=crop&auto=format&dpr=2`}
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
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Expedita, quaerat recusandae in, praesentium
                            inventore sint earum itaque laborum et dicta ab!
                            Repudiandae consectetur culpa commodi reprehenderit,
                            ut ipsum placeat magni!
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
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];
