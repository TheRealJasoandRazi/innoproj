import React from 'react';
import { Card, CardMedia } from '@mui/material';
import './App.css';

function Assets_Showcase({ imageUrl, altText }) {

  return (
    <Card className={'card'}>
      <CardMedia
        className={'media'}
        image={imageUrl}
        title={altText}
      />
    </Card>
  );
}

export default Assets_Showcase;
