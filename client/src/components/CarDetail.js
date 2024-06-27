import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Box, Link as MuiLink, CircularProgress, Alert, Button } from '@mui/material';

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/cars/${id}`, {
          headers: {
            'x-auth-token': token
          }
        });
        setCar(res.data);
      } catch (err) {
        setError('Failed to fetch car details');
        console.error(err);
      }
    };

    fetchCar();
  }, [id]);

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!car) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {car.brand} {car.model}
      </Typography>
      <Typography variant="body1">
        <strong>Year:</strong> {car.year}
      </Typography>
      <Typography variant="body1">
        <strong>Registration Certificate:</strong> {car.registrationCertificate ? (
          <MuiLink href={`http://localhost:3000/api/cars/file/${car.registrationCertificate}`} target="_blank" rel="noopener noreferrer">
            View
          </MuiLink>
        ) : 'Not uploaded'}
      </Typography>
      <Typography variant="body1">
        <strong>Circulation Permit:</strong> {car.circulationPermit ? (
          <MuiLink href={`http://localhost:3000/api/cars/file/${car.circulationPermit}`} target="_blank" rel="noopener noreferrer">
            View
          </MuiLink>
        ) : 'Not uploaded'}
      </Typography>
      <Typography variant="body1">
        <strong>Technical Review:</strong> {car.technicalReview ? (
          <MuiLink href={`http://localhost:3000/api/cars/file/${car.technicalReview}`} target="_blank" rel="noopener noreferrer">
            View
          </MuiLink>
        ) : 'Not uploaded'}
      </Typography>
      <Typography variant="body1">
        <strong>Mandatory Insurance:</strong> {car.mandatoryInsurance ? (
          <MuiLink href={`http://localhost:3000/api/cars/file/${car.mandatoryInsurance}`} target="_blank" rel="noopener noreferrer">
            View
          </MuiLink>
        ) : 'Not uploaded'}
      </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }} href="/dashboard">
        Back to Dashboard
      </Button>
    </Box>
  );
};

export default CarDetail;