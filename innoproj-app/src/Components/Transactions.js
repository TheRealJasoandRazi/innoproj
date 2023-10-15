// Import necessary components and styles from Material-UI
import {
  Container,
  Box,
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
  TablePagination,
} from "@mui/material";
import darkTheme from "../Themes/DarkTheme";
import DetailsIcon from "@mui/icons-material/Details";
import { useState } from "react";
import { useEffect } from "react";
import { useUser } from "../Contexts/UserContext";

// Define the Transactions component
const Transactions = () => {
  const { userData } = useUser();
  const [rows, setRows] = useState([
    {
      sender_addr: "",
      receiver_addr: "",
      sender: 0,
      receiver: 0,
      sender_nme: "",
      receiver_nme: "",
      amount: 0.0,
      asset_uid: 0,
      timestamp: "",
    },
  ]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(14);

  const addTransactions = (data) => {
    let transactions = [];
    transactions.push(data.message.map((i) => i));
    setRows(...transactions);
  };

  const getTransactions = () => {
    if (userData.id !== 0) {
      fetch(`http://127.0.0.1:4000/transactions/${userData.walletAddress}`)
        .then((response) => {
          if (!response.ok) {
            console.log("server error");
          }
          return response.json();
        })
        .then((data) => addTransactions(data))
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };

  useEffect(() => getTransactions(), []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    // Theme and layout setup
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: "#1f1f2f",
          boxShadow: "0rem 0.0rem 5em rgba(0, 0, 0, 1)",
          height: "95vh",
          minWidth: "80vw",
          maxWidth: "90vw",
          mx: "auto",
        }}
      >
        <Box sx={{ pt: "10px" }}>
          {/* Title */}
          <Typography variant="h4" sx={{ mb: "1.5rem" }}>
            Transaction History
          </Typography>

          {/* Table */}
          <TableContainer component={Box}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="transaction history table"
            >
              {/* Table header */}
              <TableHead
                sx={{
                  bgcolor: "rgb(43 43 43)",
                  border: "1px solid rgba(81, 81, 81, 1)",
                }}
              >
                <TableRow>
                  <TableCell sx={{ fontSize: "1.5rem" }}>Seller</TableCell>
                  <TableCell sx={{ fontSize: "1.5rem" }} align="right">
                    Seller's wallet
                  </TableCell>
                  <TableCell sx={{ fontSize: "1.5rem" }} align="right">
                    Buyer
                  </TableCell>
                  <TableCell sx={{ fontSize: "1.5rem" }} align="right">
                    Buyer's Wallet
                  </TableCell>
                  <TableCell sx={{ fontSize: "1.5rem" }} align="right">
                    Asset
                  </TableCell>
                  <TableCell sx={{ fontSize: "1.5rem" }} align="right">
                    Price
                  </TableCell>
                  <TableCell sx={{ fontSize: "1.5rem" }} align="right">
                    Time & Date
                  </TableCell>
                </TableRow>
              </TableHead>
              {/* Table body */}
              <TableBody
                sx={{
                  bgcolor: "rgb(43 43 43)",
                  border: "1px solid rgba(81, 81, 81, 1)",
                }}
              >
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row.sender_nme}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="right">{row.sender_nme}</TableCell>
                      <TableCell align="right">{row.sender_addr}</TableCell>
                      <TableCell align="right">{row.receiver_nme}</TableCell>
                      <TableCell align="right">{row.receiver_addr}</TableCell>
                      <TableCell align="right">
                        {require(`../Data/NFTs/${row.asset_uid}.json`).title}
                      </TableCell>
                      <TableCell align="right">{row.amount}</TableCell>
                      <TableCell align="right">{row.timestamp}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[14, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Transactions;
