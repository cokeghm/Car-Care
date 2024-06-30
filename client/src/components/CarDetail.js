import React from 'react';
import { Typography, Box, Link as MuiLink } from '@mui/material';

const CarDetail = ({ car }) => {
  if (!car) {
    return null;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {car.brand} {car.model}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box>
            <Typography variant="body1"><strong>Registration Certificate:</strong></Typography>
            <Typography variant="body1">
              {car.registrationCertificate ? (
                <MuiLink href={`${process.env.REACT_APP_API_URL}/api/cars/file/${car.registrationCertificate}`} target="_blank" rel="noopener noreferrer">
                  View
                </MuiLink>
              ) : 'Not uploaded'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1"><strong>Circulation Permit:</strong></Typography>
            <Typography variant="body1">
              {car.circulationPermit ? (
                <MuiLink href={`${process.env.REACT_APP_API_URL}/api/cars/file/${car.circulationPermit}`} target="_blank" rel="noopener noreferrer">
                  View
                </MuiLink>
              ) : 'Not uploaded'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1"><strong>Technical Review:</strong></Typography>
            <Typography variant="body1">
              {car.technicalReview ? (
                <MuiLink href={`${process.env.REACT_APP_API_URL}/api/cars/file/${car.technicalReview}`} target="_blank" rel="noopener noreferrer">
                  View
                </MuiLink>
              ) : 'Not uploaded'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1"><strong>Mandatory Insurance:</strong></Typography>
            <Typography variant="body1">
              {car.mandatoryInsurance ? (
                <MuiLink href={`${process.env.REACT_APP_API_URL}/api/cars/file/${car.mandatoryInsurance}`} target="_blank" rel="noopener noreferrer">
                  View
                </MuiLink>
              ) : 'Not uploaded'}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Typography variant="body1">
        <strong>Year:</strong> {car.year}
      </Typography>
    </Box>
  );
};

export default CarDetail;