import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  ThemeProvider,
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
} from "@mui/material";
import darkTheme from "../Themes/DarkTheme";
import { useCart } from "../Contexts/CartContext";
import { useUser } from "../Contexts/UserContext";

const Cart = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(14);
  const { userData } = useUser();
  const [userBalance, setUserBalance] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const createTransaction = () => {
    let cart_assets = [];
    cart_assets.push(cart.items.map((i) => i.Asset_ID));

    fetch(`http://192.168.160.133:4000/create-transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ buyer: userData.id, assets: cart_assets }),
    })
      .then((response) => {
        if (response.ok) {
          response.json();
          resetCart();
        }
      })
      .then((data) => {
        setMessage("Transaction Complete");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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

  useEffect(() => getWalletBalance(), []);

  const [message, setMessage] = useState("");

  const { cart, resetCart, removeItemFromCart } = useCart();

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
          <Box sx={{ height: "100vh" }}>
            <Typography variant="h4" sx={{ mb: "1.5rem" }}>
              Cart&nbsp;{message}
              <Button
                variant="contained"
                color="secondary"
                sx={{ float: "right", mt: "0.5rem" }}
                onClick={() => {
                  createTransaction();
                  getWalletBalance();
                  setTimeout(() => {
                    window.location.href = "/";
                  }, 2000);
                }}
              >
                Buy Items
              </Button>
            </Typography>
            <Typography sx={{ mb: 2 }} variant="h6">
              Wallet Balance - {userBalance}
            </Typography>

            {/* Table */}
            <TableContainer component={Box}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="Cart item table"
              >
                {/* Table header */}
                <TableHead
                  sx={{
                    bgcolor: "rgb(43 43 43)",
                    border: "1px solid rgba(81, 81, 81, 1)",
                  }}
                >
                  <TableRow>
                    <TableCell sx={{ fontSize: "1.5rem" }}>Item</TableCell>
                    <TableCell sx={{ fontSize: "1.5rem" }} align="right">
                      Price&nbsp;$
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.5rem" }} align="right">
                      Owner
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.5rem" }} align="right">
                      Total&nbsp;$
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.5rem" }} align="right">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          resetCart();
                        }}
                      >
                        Clear
                      </Button>
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
                  {cart.items
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ fontSize: "1.2rem !important" }}
                        >
                          {require(`../Data/NFTs/${row.Asset_ID}.json`).title}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontSize: "1.2rem !important" }}
                        >
                          {row.Price}&nbsp;ETH
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontSize: "1.2rem !important" }}
                        >
                          {row.Username}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontSize: "1.2rem !important" }}
                        >
                          {row.Price}&nbsp;ETH
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontSize: "1.2rem !important" }}
                        >
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                              removeItemFromCart(index);
                            }}
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontSize: "1.2rem !important" }}
                    >
                      Total QTY - {cart.quantity}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontSize: "1.2rem !important" }}
                    >
                      {cart.totalPrice}&nbsp;ETH
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[14, 25, 100]}
              component="div"
              count={cart.items.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default Cart;
