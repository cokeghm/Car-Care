import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';

const AddCar = () => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [registrationCertificate, setRegistrationCertificate] = useState(null);
  const [circulationPermit, setCirculationPermit] = useState(null);
  const [technicalReview, setTechnicalReview] = useState(null);
  const [mandatoryInsurance, setMandatoryInsurance] = useState(null);
  const [registrationCertificateLoaded, setRegistrationCertificateLoaded] = useState(false);
  const [circulationPermitLoaded, setCirculationPermitLoaded] = useState(false);
  const [technicalReviewLoaded, setTechnicalReviewLoaded] = useState(false);
  const [mandatoryInsuranceLoaded, setMandatoryInsuranceLoaded] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e, setFile, setLoaded) => {
    setFile(e.target.files[0]);
    setLoaded(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('brand', brand);
    formData.append('model', model);
    formData.append('year', year);
    if (registrationCertificate) formData.append('registrationCertificate', registrationCertificate);
    if (circulationPermit) formData.append('circulationPermit', circulationPermit);
    if (technicalReview) formData.append('technicalReview', technicalReview);
    if (mandatoryInsurance) formData.append('mandatoryInsurance', mandatoryInsurance);

    try {
      const token = localStorage.getItem('token');
      const res = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/cars`, formData, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'multipart/form-data'
        }
      });
      if (res.data) {
        setSuccess('Car added successfully');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setError('Unexpected response format');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to add car');
      console.error(err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto', mt: 5 }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Add Car
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <TextField
        label="Brand"
        variant="outlined"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        required
      />
      <TextField
        label="Model"
        variant="outlined"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        required
      />
      <TextField
        label="Year"
        variant="outlined"
        type="number"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
      />
      <Button variant="contained" component="label">
        Upload Registration Certificate
        <input
          type="file"
          hidden
          onChange={(e) => handleFileChange(e, setRegistrationCertificate, setRegistrationCertificateLoaded)}
        />
        {registrationCertificateLoaded && <CheckIcon sx={{ ml: 1 }} />}
      </Button>
      <Button variant="contained" component="label">
        Upload Circulation Permit
        <input
          type="file"
          hidden
          onChange={(e) => handleFileChange(e, setCirculationPermit, setCirculationPermitLoaded)}
        />
        {circulationPermitLoaded && <CheckIcon sx={{ ml: 1 }} />}
      </Button>
      <Button variant="contained" component="label">
        Upload Technical Review
        <input
          type="file"
          hidden
          onChange={(e) => handleFileChange(e, setTechnicalReview, setTechnicalReviewLoaded)}
        />
        {technicalReviewLoaded && <CheckIcon sx={{ ml: 1 }} />}
      </Button>
      <Button variant="contained" component="label">
        Upload Mandatory Insurance
        <input
          type="file"
          hidden
          onChange={(e) => handleFileChange(e, setMandatoryInsurance, setMandatoryInsuranceLoaded)}
        />
        {mandatoryInsuranceLoaded && <CheckIcon sx={{ ml: 1 }} />}
      </Button>
      <Button variant="contained" color="primary" type="submit">
        Add Car
      </Button>
    </Box>
  );
};

export default AddCar;