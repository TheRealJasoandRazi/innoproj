import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'; // Import TextField
import { Button } from '@mui/material';

const RightAlignedContainer = styled('div')({
  marginLeft: 'auto', // Move to the rightmost side
  display: 'flex',
  alignItems: 'center',
});

function Headers() {
  return (
    <AppBar position="static">
      <Toolbar>
        <TextField
          placeholder="Search..."
          sx={{ ml: "5px", width: "2000px" }}
          variant="outlined"
          size="small"
        />
        <Button variant='outlined' color='secondary' sx={{ mr: "5px", ml: "5px" }}>Filter</Button>
        <Button variant='outlined' color='secondary' sx={{ }}>Profile</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Headers;
