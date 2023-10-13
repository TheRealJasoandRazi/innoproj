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
// import itemData from "../Data/ImageArray";
let itemData = [];
const Home = () => {
  let userBalance = 100;
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
          }}
        >
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
                  {itemData.slice(0, 10).map((item) => (
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
                      onClick={() => handleImageClick(item)}
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
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quaerat quis sapiente incidunt dolore dolorem
                            officiis sunt est eius atque.
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
