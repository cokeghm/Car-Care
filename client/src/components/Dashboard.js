import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Box, Button, CircularProgress, Alert, Table, TableHead, TableBody, TableRow, TableCell, Paper, Card, CardContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/cars`, {
          headers: {
            'x-auth-token': token
          }
        });
        setCars(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cars');
        setLoading(false);
        console.error(err);
      }
    };

    fetchCars();
  }, []);

  const fetchCarDetails = async (carId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/cars/${carId}`, {
        headers: {
          'x-auth-token': token
        }
      });
      setSelectedCar(res.data);
    } catch (err) {
      setError('Failed to fetch car details');
      console.error(err);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Tus Autos
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/add-car"
          startIcon={<AddIcon />}
        >
          Add Car
        </Button>
      </Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold', width: '25%', fontSize: '1.2rem' }}>Marca</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '25%', fontSize: '1.2rem' }}>Modelo</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '15%', fontSize: '1.2rem' }}>Año</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '35%', fontSize: '1.2rem' }}>Detalles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map(car => (
              <TableRow key={car._id} onClick={() => fetchCarDetails(car._id)} sx={{ cursor: 'pointer' }}>
                <TableCell sx={{ fontSize: '1.1rem' }}>{car.brand}</TableCell>
                <TableCell sx={{ fontSize: '1.1rem' }}>{car.model}</TableCell>
                <TableCell sx={{ fontSize: '1.1rem' }}>{car.year}</TableCell>
                <TableCell sx={{ fontSize: '1.1rem' }}>
                  <Button variant="outlined" color="primary">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      {selectedCar && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ fontSize: '1.5rem' }}>
              {selectedCar.brand} {selectedCar.model}
            </Typography>
            <Typography sx={{ mb: 1.5, fontSize: '1.25rem' }} color="text.secondary">
              Year: {selectedCar.year}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '1.1rem' }}>
              Registration Certificate: {selectedCar.registrationCertificate ? <a href={`${process.env.REACT_APP_API_URL}/api/files/${selectedCar.registrationCertificate}`} target="_blank" rel="noopener noreferrer">View</a> : 'Not uploaded'}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '1.1rem' }}>
              Circulation Permit: {selectedCar.circulationPermit ? <a href={`${process.env.REACT_APP_API_URL}/api/files/${selectedCar.circulationPermit}`} target="_blank" rel="noopener noreferrer">View</a> : 'Not uploaded'}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '1.1rem' }}>
              Technical Review: {selectedCar.technicalReview ? <a href={`${process.env.REACT_APP_API_URL}/api/files/${selectedCar.technicalReview}`} target="_blank" rel="noopener noreferrer">View</a> : 'Not uploaded'}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '1.1rem' }}>
              Mandatory Insurance: {selectedCar.mandatoryInsurance ? <a href={`${process.env.REACT_APP_API_URL}/api/files/${selectedCar.mandatoryInsurance}`} target="_blank" rel="noopener noreferrer">View</a> : 'Not uploaded'}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Dashboard;