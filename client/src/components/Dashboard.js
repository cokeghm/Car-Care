import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Box, Button, CircularProgress, Alert, Table, TableHead, TableBody, TableRow, TableCell, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CarDetail from './CarDetail';
import Maintenance from './Maintenance';

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCar, setSelectedCar] = useState(null);
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editCar, setEditCar] = useState({ brand: '', model: '', year: '' });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/cars`, {
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
      const carRes = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/cars/${carId}`, {
        headers: {
          'x-auth-token': token
        }
      });
      const maintenanceRes = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/maintenance/${carId}`, {
        headers: {
          'x-auth-token': token
        }
      });
      setSelectedCar(carRes.data);
      setMaintenanceRecords(maintenanceRes.data);
    } catch (err) {
      setError('Failed to fetch car details');
      console.error(err);
    }
  };

  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axiosInstance.put(`${process.env.REACT_APP_API_URL}/api/cars/${selectedCar._id}`, editCar, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json'
        }
      });
      setCars(cars.map(car => (car._id === selectedCar._id ? res.data : car)));
      setEditDialogOpen(false);
    } catch (err) {
      setError('Failed to update car');
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setEditCar({ ...editCar, [e.target.name]: e.target.value });
  };

  const handleEditClick = (car) => {
    setEditCar({ brand: car.brand, model: car.model, year: car.year });
    setSelectedCar(car);
    setEditDialogOpen(true);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }
  // Función para manejar la apertura del diálogo de eliminación
  const handleDeleteClick = (car) => {
    setCarToDelete(car);
    setDeleteDialogOpen(true);
  };
  // Función para confirmar la eliminación
  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axiosInstance.delete(`${process.env.REACT_APP_API_URL}/api/cars/${carToDelete._id}`, {
        headers: {
          'x-auth-token': token
        }
      });
      setCars(cars.filter(car => car._id !== carToDelete._id));
      setDeleteDialogOpen(false);
      setCarToDelete(null);
    } catch (err) {
      setError('Failed to delete car');
      console.error(err);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, marginTop: '60px' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.5rem', marginLeft: '3px' }}>
          Tus Autos
        </Typography>
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
      <Box sx={{ width: 'fit-content' }}>
        <Paper sx={{ overflow: 'hidden' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 'bold', width: '5%' }}>Marca</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '5%' }}>Modelo</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '5%' }}>Año</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '5%' }}>Detalles</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cars.map(car => (
                <TableRow key={car._id} sx={{ cursor: 'pointer' }}>
                  <TableCell>{car.brand}</TableCell>
                  <TableCell>{car.model}</TableCell>
                  <TableCell>{car.year}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => fetchCarDetails(car._id)}>
                      View Details
                    </Button>
                  </TableCell>
                  <TableCell>
                  < Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={(e) => { e.stopPropagation(); handleEditClick(car); }}
                        sx={{ width: '100px', backgroundColor: 'black', '&:hover': { backgroundColor: 'gray' } }}
                      >
                        Edit
                      </Button>
                        <Dialog
                          open={deleteDialogOpen}
                          onClose={() => setDeleteDialogOpen(false)}
                        > 
                          <DialogTitle>Confirm Deletion</DialogTitle>
                          <DialogContent>
                            <Typography>Are you sure you want to delete this car?</Typography>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
                              Cancel
                            </Button>
                            <Button onClick={confirmDelete} color="secondary">
                              Delete
                            </Button>
                          </DialogActions>
                        </Dialog>
                      <Button
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        onClick={(e) => { e.stopPropagation(); handleDeleteClick(car); }}
                        sx={{ width: '100px', backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
      {selectedCar && (
        <Box sx={{ padding: 1, mt: '30px', backgroundColor:'black', borderRadius: '15px' }}>
          <CarDetail car={selectedCar} />
          <Maintenance car={selectedCar} maintenanceRecords={maintenanceRecords} />
        </Box>
      )}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Car</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="brand"
            label="Brand"
            type="text"
            fullWidth
            value={editCar.brand}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="model"
            label="Model"
            type="text"
            fullWidth
            value={editCar.model}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="year"
            label="Year"
            type="number"
            fullWidth
            value={editCar.year}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;