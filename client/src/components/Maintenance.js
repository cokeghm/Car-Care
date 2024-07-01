import React, { useState, useEffect } from 'react';
import { Table, Typography, Box, TableHead, TableRow, Paper, TableCell, TableBody, TextField, Button, Snackbar, Alert } from '@mui/material';
import axiosInstance from '../axiosConfig';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const Maintenance = ({ car, maintenanceRecords }) => {
  const [records, setRecords] = useState([]);
  const [editIdx, setEditIdx] = useState(-1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    if (maintenanceRecords) {
      const formattedRecords = maintenanceRecords.map(record => ({
        ...record,
        date: dayjs(record.date)
      }));
      setRecords(formattedRecords);
    }
  }, [maintenanceRecords]);

  const handleChange = (e, field, idx) => {
    const { value } = e.target;
    const updatedRecords = records.map((record, rIdx) => 
      rIdx === idx ? { ...record, [field]: value } : record
    );
    setRecords(updatedRecords);
  };

  const handleDateChange = (date, idx) => {
    const updatedRecords = records.map((record, rIdx) => 
      rIdx === idx ? { ...record, date: date } : record
    );
    setRecords(updatedRecords);
  };
  const handleSave = async (idx) => {
    const record = records[idx];
    try {
      const token = localStorage.getItem('token');
      await axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/maintenance`, { ...record, carId: car._id }, {
        headers: {
          'x-auth-token': token,
        }
      });
      setSnackbarMessage('Maintenance record saved successfully');
      setSnackbarSeverity('success'); // New severity for success
      setSnackbarOpen(true);
      setEditIdx(-1);
    } catch (err) {
      setSnackbarMessage('Failed to save maintenance record');
      setSnackbarSeverity('error'); // New severity for error
      setSnackbarOpen(true);
      console.error('Failed to save maintenance record:', err);
    }
  };
  const handleAdd = () => {
    setRecords([...records, { date: dayjs(), type: '', description: '', price: '' }]);
    setEditIdx(records.length);
  };
  const handleDelete = async (idx) => {
    const record = records[idx];
    try {
      const token = localStorage.getItem('token');
      await axiosInstance.delete(`${process.env.REACT_APP_API_URL}/api/maintenance/${record._id}`, {
        headers: {
          'x-auth-token': token,
        }
      });
      setSnackbarMessage('Maintenance record deleted successfully');
      setSnackbarSeverity('success'); // New severity for success
      setSnackbarOpen(true);
      const updatedRecords = records.filter((_, rIdx) => rIdx !== idx);
      setRecords(updatedRecords);
    } catch (err) {
      setSnackbarMessage('Failed to delete maintenance record');
      setSnackbarSeverity('error'); // New severity for error
      setSnackbarOpen(true);
      console.error('Failed to delete maintenance record:', err);
    }
  };
  return (
    <Box sx={{ padding: 1, mt: '30px' }}>
      <Typography variant="h1" component="h1" gutterBottom sx={{ color:'white',fontWeight: 'bold', fontSize: '1.2rem', marginBottom: 2 }}>
        Mantenciones
      </Typography>
      <Paper elevation={2} sx={{ padding: 3 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>N°</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Tipo Mantenimiento</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record, idx) => (
                <TableRow key={idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>
                    <DatePicker
                      value={record.date}
                      onChange={(date) => handleDateChange(date, idx)}
                      renderInput={(params) => <TextField {...params} fullWidth disabled={editIdx !== idx} />}
                      format="DD-MM-YYYY"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={record.type}
                      onChange={(e) => handleChange(e, 'type', idx)}
                      disabled={editIdx !== idx}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={record.description}
                      onChange={(e) => handleChange(e, 'description', idx)}
                      disabled={editIdx !== idx}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={record.price}
                      onChange={(e) => handleChange(e, 'price', idx)}
                      disabled={editIdx !== idx}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    {editIdx === idx ? (
                      <Button onClick={() => handleSave(idx)}>Save</Button>
                    ) : (
                      <Button onClick={() => setEditIdx(idx)}>Edit</Button>
                    )}
                    <Button onClick={() => handleDelete(idx)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={6}>
                  <Button onClick={handleAdd}>Add Record</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </LocalizationProvider>
      </Paper>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
    </Snackbar> 
    </Box>
  );
};

export default Maintenance;