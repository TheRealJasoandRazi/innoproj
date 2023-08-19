import "./App.css";
import { Typography, Button, Container, Grid, Paper } from "@mui/material";
import Assets_Showcase from "./Index_Assets";
import Headers from "./Header";
import List from "./List";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Grid container spacing={2} id="nav-container">
      <Grid item sm={12} xs={12} md={12}>
        <Headers />
      </Grid>
      <Grid item id="balance">
        <h1>Balance: $100</h1>
        <List/>
        <h1>Watch List</h1>
      </Grid>
      <Grid item sm={12} xs={12} md={12} id="list-container">
      </Grid>
    </Grid>
  );
}

export default App;
