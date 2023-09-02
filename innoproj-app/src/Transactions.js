import { useState } from "react";
import {
  Container,
  Box,
  Stack,
  Typography,
  CssBaseline,
  ThemeProvider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import darkTheme from "./DarkTheme";
import DetailsIcon from "@mui/icons-material/Details";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function createData(transaction, seller, buyer, asset, total) {
  return { transaction, seller, buyer, asset, total };
}

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

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

const Transactions = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Container fixed sx={{ bgcolor: "#1f1f2f" }}>
          <Box sx={{ height: "100vh", pt: "10px" }}>
            <Typography variant="h4" sx={{mb: "1.5rem"}}>Transaction History</Typography>
            <TableContainer component={Box}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="transaction history table"
              >
                <TableHead sx={{bgcolor: "rgb(43 43 43)", border: "1px solid rgba(81, 81, 81, 1)"}}>
                  <TableRow>
                    <TableCell sx={{fontSize: "1.5rem"}}>TransactionID</TableCell>
                    <TableCell sx={{fontSize: "1.5rem"}} align="right">Seller</TableCell>
                    <TableCell sx={{fontSize: "1.5rem"}} align="right">Buyer</TableCell>
                    <TableCell sx={{fontSize: "1.5rem"}} align="right">Asset</TableCell>
                    <TableCell sx={{fontSize: "1.5rem"}} align="right">Total&nbsp;$</TableCell>
                    <TableCell sx={{fontSize: "1.5rem"}} align="right">Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{bgcolor: "rgb(43 43 43)", border: "1px solid rgba(81, 81, 81, 1)"}}>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.transaction}
                      </TableCell>
                      <TableCell align="right">
                        <a href="">u/{row.seller}</a>
                      </TableCell>
                      <TableCell align="right">
                        <a href="">u/{row.buyer}</a>
                      </TableCell>
                      <TableCell align="right">{row.asset}</TableCell>
                      <TableCell align="right">{row.total}</TableCell>
                      <TableCell align="right">
                        <IconButton sx={{ borderRadius: "0" }}>
                          <DetailsIcon
                            sx={{ fontSize: 20, fill: "purple" }}
                          ></DetailsIcon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default Transactions;

const rows = Array.from({ length: 150 }, () => createData(
  makeid(18),
  generateFakeUsername(),
  generateFakeUsername(),
  makeid(16),
  Math.floor(Math.random() * 10000)
));
