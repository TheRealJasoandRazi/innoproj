import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  IconButton,
} from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#474752", // Replace with your desired primary color
    },
    background: {
      default: "#21212f", // Replace with your desired background color
      paper: "#1e1e1e",
      box: "white",
    },
  },
  typography: {
    allVariants: {
      color: "white", // Set all text to white
    },
  },
});

const FAQpage = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Container fixed sx={{ bgcolor: "#1f1f2f" }}>
          <Box sx={{ height: "100vh", pt: "10px" }}>
            <Box sx={{ borderBottom: "3px solid white" }}>
              <Typography variant="h3">
                FAQ Page:{" "}
                <QuizIcon edge="start" sx={{ fill: "white", fontSize: 50 }} />
              </Typography>
            </Box>
            <Box sx={{ mt: 10 }}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Question</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Numquam enim voluptate blanditiis amet pariatur. Optio sunt
                    sint eveniet ipsam suscipit, dolor nostrum, temporibus
                    incidunt illum, quo eos maxime animi architecto. Possimus,
                    hic voluptate. Vel, tenetur eaque fugit alias aliquid
                    explicabo quidem ipsum commodi, cupiditate quo sunt
                    voluptatum temporibus maiores itaque facere molestias illum
                    modi. Quam velit commodi quisquam dolore dignissimos! Non ad
                    maiores tempora quaerat, repellendus nostrum vitae esse.
                    Voluptatem ipsam ducimus quis accusamus illo! Nesciunt eum
                    assumenda eaque dolore aspernatur ea quaerat deserunt,
                    tempora voluptatem saepe laudantium cupiditate ad.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Question</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Numquam enim voluptate blanditiis amet pariatur. Optio sunt
                    sint eveniet ipsam suscipit, dolor nostrum, temporibus
                    incidunt illum, quo eos maxime animi architecto. Possimus,
                    hic voluptate. Vel, tenetur eaque fugit alias aliquid
                    explicabo quidem ipsum commodi, cupiditate quo sunt
                    voluptatum temporibus maiores itaque facere molestias illum
                    modi. Quam velit commodi quisquam dolore dignissimos! Non ad
                    maiores tempora quaerat, repellendus nostrum vitae esse.
                    Voluptatem ipsam ducimus quis accusamus illo! Nesciunt eum
                    assumenda eaque dolore aspernatur ea quaerat deserunt,
                    tempora voluptatem saepe laudantium cupiditate ad.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Question</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Numquam enim voluptate blanditiis amet pariatur. Optio sunt
                    sint eveniet ipsam suscipit, dolor nostrum, temporibus
                    incidunt illum, quo eos maxime animi architecto. Possimus,
                    hic voluptate. Vel, tenetur eaque fugit alias aliquid
                    explicabo quidem ipsum commodi, cupiditate quo sunt
                    voluptatum temporibus maiores itaque facere molestias illum
                    modi. Quam velit commodi quisquam dolore dignissimos! Non ad
                    maiores tempora quaerat, repellendus nostrum vitae esse.
                    Voluptatem ipsam ducimus quis accusamus illo! Nesciunt eum
                    assumenda eaque dolore aspernatur ea quaerat deserunt,
                    tempora voluptatem saepe laudantium cupiditate ad.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Question</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Numquam enim voluptate blanditiis amet pariatur. Optio sunt
                    sint eveniet ipsam suscipit, dolor nostrum, temporibus
                    incidunt illum, quo eos maxime animi architecto. Possimus,
                    hic voluptate. Vel, tenetur eaque fugit alias aliquid
                    explicabo quidem ipsum commodi, cupiditate quo sunt
                    voluptatum temporibus maiores itaque facere molestias illum
                    modi. Quam velit commodi quisquam dolore dignissimos! Non ad
                    maiores tempora quaerat, repellendus nostrum vitae esse.
                    Voluptatem ipsam ducimus quis accusamus illo! Nesciunt eum
                    assumenda eaque dolore aspernatur ea quaerat deserunt,
                    tempora voluptatem saepe laudantium cupiditate ad.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Question</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Numquam enim voluptate blanditiis amet pariatur. Optio sunt
                    sint eveniet ipsam suscipit, dolor nostrum, temporibus
                    incidunt illum, quo eos maxime animi architecto. Possimus,
                    hic voluptate. Vel, tenetur eaque fugit alias aliquid
                    explicabo quidem ipsum commodi, cupiditate quo sunt
                    voluptatum temporibus maiores itaque facere molestias illum
                    modi. Quam velit commodi quisquam dolore dignissimos! Non ad
                    maiores tempora quaerat, repellendus nostrum vitae esse.
                    Voluptatem ipsam ducimus quis accusamus illo! Nesciunt eum
                    assumenda eaque dolore aspernatur ea quaerat deserunt,
                    tempora voluptatem saepe laudantium cupiditate ad.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Question</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Numquam enim voluptate blanditiis amet pariatur. Optio sunt
                    sint eveniet ipsam suscipit, dolor nostrum, temporibus
                    incidunt illum, quo eos maxime animi architecto. Possimus,
                    hic voluptate. Vel, tenetur eaque fugit alias aliquid
                    explicabo quidem ipsum commodi, cupiditate quo sunt
                    voluptatum temporibus maiores itaque facere molestias illum
                    modi. Quam velit commodi quisquam dolore dignissimos! Non ad
                    maiores tempora quaerat, repellendus nostrum vitae esse.
                    Voluptatem ipsam ducimus quis accusamus illo! Nesciunt eum
                    assumenda eaque dolore aspernatur ea quaerat deserunt,
                    tempora voluptatem saepe laudantium cupiditate ad.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Question</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Numquam enim voluptate blanditiis amet pariatur. Optio sunt
                    sint eveniet ipsam suscipit, dolor nostrum, temporibus
                    incidunt illum, quo eos maxime animi architecto. Possimus,
                    hic voluptate. Vel, tenetur eaque fugit alias aliquid
                    explicabo quidem ipsum commodi, cupiditate quo sunt
                    voluptatum temporibus maiores itaque facere molestias illum
                    modi. Quam velit commodi quisquam dolore dignissimos! Non ad
                    maiores tempora quaerat, repellendus nostrum vitae esse.
                    Voluptatem ipsam ducimus quis accusamus illo! Nesciunt eum
                    assumenda eaque dolore aspernatur ea quaerat deserunt,
                    tempora voluptatem saepe laudantium cupiditate ad.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Question</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Numquam enim voluptate blanditiis amet pariatur. Optio sunt
                    sint eveniet ipsam suscipit, dolor nostrum, temporibus
                    incidunt illum, quo eos maxime animi architecto. Possimus,
                    hic voluptate. Vel, tenetur eaque fugit alias aliquid
                    explicabo quidem ipsum commodi, cupiditate quo sunt
                    voluptatum temporibus maiores itaque facere molestias illum
                    modi. Quam velit commodi quisquam dolore dignissimos! Non ad
                    maiores tempora quaerat, repellendus nostrum vitae esse.
                    Voluptatem ipsam ducimus quis accusamus illo! Nesciunt eum
                    assumenda eaque dolore aspernatur ea quaerat deserunt,
                    tempora voluptatem saepe laudantium cupiditate ad.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Question</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Numquam enim voluptate blanditiis amet pariatur. Optio sunt
                    sint eveniet ipsam suscipit, dolor nostrum, temporibus
                    incidunt illum, quo eos maxime animi architecto. Possimus,
                    hic voluptate. Vel, tenetur eaque fugit alias aliquid
                    explicabo quidem ipsum commodi, cupiditate quo sunt
                    voluptatum temporibus maiores itaque facere molestias illum
                    modi. Quam velit commodi quisquam dolore dignissimos! Non ad
                    maiores tempora quaerat, repellendus nostrum vitae esse.
                    Voluptatem ipsam ducimus quis accusamus illo! Nesciunt eum
                    assumenda eaque dolore aspernatur ea quaerat deserunt,
                    tempora voluptatem saepe laudantium cupiditate ad.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default FAQpage;