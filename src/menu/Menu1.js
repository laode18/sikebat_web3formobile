/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './css/Menu1.css'; // Import stylesheet for custom styling
import { Card, CardGroup } from 'react-bootstrap';
import { CardContent, CardMedia, Typography, Container, Grid } from '@mui/material';

const menuData = [
  {
    id: 1,
    title: 'Total Penduduk',
    imageSrc: 'assets/icon1.png',
    description: '12 Orang',
  },
  {
    id: 2,
    title: 'Total Keluarga',
    imageSrc: 'assets/icon2.png',
    description: '15 Keluarga',
  },
  {
    id: 3,
    title: 'Total Laki-Laki',
    imageSrc: 'assets/icon4.png',
    description: '12 Orang',
  },
  {
    id: 4,
    title: 'Total Perempuan',
    imageSrc: 'assets/icon3.png',
    description: '15 Keluarga',
  },
  // Tambahkan data untuk menu-item berikutnya di sini
];

const menuItems = [
  {
    image: 'assets/berita1.jpg', // Ganti dengan URL atau path gambar pertama
    text: 'Menu 1 Content 1',
  },
  {
    image: 'assets/berita2.jpg', // Ganti dengan URL atau path gambar kedua
    text: 'Menu 1 Content 2',
  },
  // ... Lanjutkan untuk item lainnya
];

const Menu1 = () => {
  return (
    <div className="menu1-container">
      
      <Carousel autoPlay interval={3000} infiniteLoop showThumbs={false} showStatus={true}>
        <div>
          <img src="assets/berita1.jpg" alt="Image 1" />
        </div>
        <div>
          <img src="assets/berita2.jpg" alt="Image 2" />
        </div>
        <div>
          <img src="assets/berita3.jpg" alt="Image 3" />
        </div>
        <div>
          <img src="assets/berita1.jpg" alt="Image 4" />
        </div>
      </Carousel>

      <h2 style={{ textAlign: 'left', paddingTop: '5px' }}>Informasi</h2>
      <CardGroup style={{ display: 'flex', overflowX: 'scroll', scrollSnapType: 'x mandatory' }}>
        {menuData.map((menu) => (
          <Card key={menu.id} style={{ flex: '1', minWidth: '120px', maxWidth: '150px', margin: '0 20px', scrollSnapAlign: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: '120px', maxWidth: '120px' }}>
              <Card.Img variant="top" src={menu.imageSrc} />
              <Card.Body>
                <Card.Title>{menu.title}</Card.Title>
                <Card.Text>{menu.description}</Card.Text>
              </Card.Body>
            </div>
          </Card>
        ))}
      </CardGroup>

      <h2 style={{ textAlign: 'left', paddingTop: '5px' }}>Berita</h2>
      <Container style={{ marginBottom: '40px' }}>
      <Grid container spacing={2}>
        {menuItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={`Menu ${index + 1}`}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {item.text}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </div>
  );
};

export default Menu1;
