import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TextField, Button } from '@mui/material';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

const Maintenance = ({ car }) => {
  const [records, setRecords] = useState([]);
  const [editIdx, setEditIdx] = useState(-1);

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
      await axios.post(`${process.env.REACT_APP_API_URL}/api/maintenance`, { ...record, carId: car._id }, {
        headers: {
          'x-auth-token': token,
        }
      });
      setEditIdx(-1);
    } catch (err) {
      console.error('Failed to save maintenance record:', err);
    }
  };

  const handleAdd = () => {
    setRecords([...records, { date: dayjs(), type: '', description: '', price: '' }]);
    setEditIdx(records.length);
  };

  return (
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
  );
};

export default Maintenance;