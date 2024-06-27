import React from 'react';
import { Box, Typography, Button, Container, Card, CardContent, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <img src="/Logo.jpg" alt="Logo" style={{ height: '300px' }} />
      </Box>
      <Card sx={{ boxShadow: 'none' }}>
        <CardContent>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" component="h1" gutterBottom> {/* Letra más grande */}
              Bienvenido a Car Care
            </Typography>
            <Typography variant="h5" sx={{ mb: 2 }}> {/* Letra más grande */}
               Gestiona las mantenciones de tus autos y respalda la documentación importante.
            </Typography>
          </Box>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button 
            component={Link} 
            to="/login" 
            variant="contained" 
            color="primary" 
            sx={{ mr: 2, px: 4, py: 2, fontSize: '1.2rem', backgroundColor: 'black', color: 'white', width: '150px' }} // Botón en blanco y negro, mismo ancho
          >
            Login
          </Button>
          <Button 
            component={Link} 
            to="/register" 
            variant="outlined" 
            color="primary" 
            sx={{ px: 4, py: 2, fontSize: '1.2rem', borderColor: 'black', color: 'black', width: '150px' }} // Botón en blanco y negro, mismo ancho
          >
            Register
          </Button>
      </CardActions>
      </Card>
    </Container>
  );
};

export default Home;