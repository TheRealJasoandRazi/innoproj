import "./App.css";
import { Typography, Button, Container, Grid, Paper } from "@mui/material";
import Assets_Showcase from "./Index_Assets";
import Headers from "./Header";
import { useParams } from 'react-router-dom';

function Details() {
    const { title } = useParams();
    return (
        <div>
          <h1>Details for {title}</h1>
          {/* Display item details */}
        </div>
    );
};