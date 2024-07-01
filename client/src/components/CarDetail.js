import React from 'react';
import { Typography, Box, Link as MuiLink, Paper } from '@mui/material';

const CarDetail = ({ car }) => {
  if (!car) {
    return null;
  }

  return (
    <Box sx={{ padding: 1, mt:'30px' }}>
      <Typography variant="h1" component="h1" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: 2 }}>
        Detalle Auto
      </Typography>
      <Paper elevation={2} sx={{ padding: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            {car.brand} {car.model}
          </Typography>
          <Box sx={{ display: 'flex',mr:'40%', gap: 4 }}>
            <Box>
              <Typography variant="body1"><strong>Padrón:</strong></Typography>
              <Typography variant="body1">
                {car.registrationCertificate ? (
                  <MuiLink href={`${car.registrationCertificate}`} target="_blank" rel="noopener noreferrer">
                    View
                  </MuiLink>
                ) : 'Not uploaded'}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1"><strong>Permiso Circulación:</strong></Typography>
              <Typography variant="body1">
                {car.circulationPermit ? (
                  <MuiLink href={`${car.circulationPermit}`} target="_blank" rel="noopener noreferrer">
                    View
                  </MuiLink>
                ) : 'Not uploaded'}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1"><strong>Revisión Técnica:</strong></Typography>
              <Typography variant="body1">
                {car.technicalReview ? (
                  <MuiLink href={`${car.technicalReview}`} target="_blank" rel="noopener noreferrer">
                    View
                  </MuiLink>
                ) : 'Not uploaded'}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1"><strong>SOAP:</strong></Typography>
              <Typography variant="body1">
                {car.mandatoryInsurance ? (
                  <MuiLink href={`${car.mandatoryInsurance}`} target="_blank" rel="noopener noreferrer">
                    View
                  </MuiLink>
                ) : 'Not uploaded'}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Typography>
          <strong>Año:</strong> {car.year}
        </Typography>
      </Paper>
    </Box>
  );
};

export default CarDetail;