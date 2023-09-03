import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useCart } from "../Contexts/CartContext";

const Cart = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(14);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const navigate = useNavigate();

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
                  setMessage("Items Bought!\tReturning To Homepage!");
                  resetCart();
                  // Wait for 2 seconds before returning to the homepage
                  setTimeout(() => {
                    window.location.href = "/";
                  }, 2000);
                }}
              >
                Buy Items
              </Button>
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
                    <TableCell sx={{ fontSize: "1.5rem" }}>Item</TableCell>
                    <TableCell sx={{ fontSize: "1.5rem" }} align="right">
                      Price&nbsp;$
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.5rem" }} align="right">
                      Quantity
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
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ fontSize: "1.2rem !important" }}
                        >
                          {row.name.title}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontSize: "1.2rem !important" }}
                        >
                          {row.price.toLocaleString()}&nbsp;$
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontSize: "1.2rem !important" }}
                        >
                          {row.qty}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontSize: "1.2rem !important" }}
                        >
                          {(row.price * row.qty).toLocaleString()}&nbsp;$
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
                      {cart.quantity}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontSize: "1.2rem !important" }}
                    >
                      {cart.totalPrice.toLocaleString()}&nbsp;$
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
