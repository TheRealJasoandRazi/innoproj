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
  IconButton,
} from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import { useNavigate } from "react-router-dom";
import WatchList from "./WatchList";
import darkTheme from "../Themes/DarkTheme";
import { useState, useEffect } from "react";
import { useUser } from "../Contexts/UserContext";

const Home = () => {
  const [userBalance, setUserBalance] = useState(0);
  const navigate = useNavigate();
  const { userData } = useUser();
  const [Images, setImages] = useState([]);

  const handleImageClick = (item) => {
    if (userData.isLoggedIn) {
      navigate(`/asset?param=${item.Asset_ID}`);
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

  const getImages = () => {
    fetch("http://127.0.0.1:4000/assets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startIndex: 1,
        count: 10,
        id: userData.id,
        sortPrice: "d",
        sortRarity: "a",
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

  function DisplayNewImages(imgs) {
    let itemData = [];
    itemData.push(
      imgs.map((i) => {
        const title = require(`../Data/NFTs/${i.Asset_ID}.json`).title;
        return { ...i, title: title };
      })
    );
    setImages(...itemData);
  }

  useEffect(() => {
    const getWalletBalance = () => {
      // fetch data from /balance/id
      if (userData.id !== 0) {
        fetch(`http://127.0.0.1:4000/balance/${userData.id}`)
          .then((response) => {
            if (!response.ok) {
              console.log("server error");
            }
            return response.json();
          })
          .then((data) => {
            setUserBalance(data.Balance);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }
    };

    getImages();
    getWalletBalance();
    // Set up the interval to run the function every 30 seconds
    const intervalId = setInterval(getWalletBalance, 30000); // 30,000 milliseconds = 30 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // The empty dependency array ensures that the effect runs only once when the component mounts

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Container
          fixed
          sx={{
            bgcolor: "#1f1f2f",
            boxShadow: "0rem 0.0rem 5em rgba(0, 0, 0, 1)",
          }}
        >
          <Box sx={{ pt: "10px" }}>
            <Box sx={{ mb: "10px", borderBottom: "2px solid white" }}>
              <Typography variant="h6" display={false}>
                Balance: {userBalance}
              </Typography>
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
                  {Images.map((item) => (
                    <ImageListItem
                      key={item.Asset_ID}
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
                      onClick={() => handleImageClick(item)}
                    >
                      <img
                        src={require(`../Data/NFTs/${item.Asset_ID}.svg`)}
                        alt={item.title}
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
                        sx={{ height: "fit-content" }}
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
