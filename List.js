import "./App.css";
import { Container } from "@mui/material";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Link } from 'react-router-dom';

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
    desc: 'testing',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
    desc: 'testing',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
    desc: 'testing',
  },
];

function List() {
  return (
    <Container maxWidth="xl">
      <ImageList cols={3} style={{ width: '100%' }}>
        {itemData.map((item) => (
            <ImageListItem key={item.img} id="hot-list-item" >
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
                id="hot-list-image"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={item.author}
                id="hot-list-caption"
              />
            </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
}

export default List;

