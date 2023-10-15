import { useState } from "react";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import darkTheme from "../Themes/DarkTheme";
import { useUser } from "../Contexts/UserContext";

const LogIn = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [auth, setAuth] = useState("");
  const { setUser } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClear = () => {
    setFormData({ username: "", password: "" });
  };

  const handleSubmit = () => {
    fetch(`http://127.0.0.1:4000/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 401) {
          setAuth("Incorrect password");
        } else if (response.ok) {
          return response.json();
        } else {
          console.error("Failed to log in");
        }
      })
      .then((data) => {
        setUser({
          id: parseInt(data.user.Account_ID),
          username: String(data.user.Username),
          walletAddress: String(data.user.Wallet_Address),
          isLoggedIn: true,
        });
        setAuth("Logged in successfully.");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container
        fixed
        sx={{
          bgcolor: "#1f1f2f",
          boxShadow: "0rem 0.0rem 5em rgba(0, 0, 0, 1)",
          minHeight: "92vh",
        }}
      >
        <Box sx={{ borderBottom: "0.25rem solid indigo", pb: "0.5rem" }}>
          <Typography variant="h3">User Login</Typography>
        </Box>
        <form>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="danger" onClick={handleClear}>
            Clear
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
            sx={{ ml: 2 }}
          >
            Submit
          </Button>
        </form>
        <Box
          sx={{ borderTop: "0.25rem solid indigo", pt: "0.5rem", mt: "1rem" }}
        >
          <Typography variant="h5">Result: - {auth}</Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LogIn;
