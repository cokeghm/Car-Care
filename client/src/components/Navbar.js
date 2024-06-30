import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'white' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <RouterLink to="/" style={{ textDecoration: 'none' }}>
            <img src="/Logo.jpg" alt="Logo" style={{ height: '70px', 'marginTop': '18px' }} />
          </RouterLink>
        </Box>
        <Button color="primary" component={RouterLink} to="/dashboard">
          Mis Autos
        </Button>
        <Button color="primary" component={RouterLink} to="/login">
          Login
        </Button>
        <Button color="primary" component={RouterLink} to="/register">
          Register
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;