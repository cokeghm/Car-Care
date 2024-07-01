// routes/maintenance.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Maintenance = require('../models/Maintenance');

// Obtener mantenimientos por ID de auto
router.get('/:carId', auth, async (req, res) => {
  try {
    const maintenances = await Maintenance.find({ carId: req.params.carId });
    res.json(maintenances);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Guardar mantenimiento
router.post('/', auth, async (req, res) => {
  const { date, type, description, price, carId } = req.body;
  try {
    const newMaintenance = new Maintenance({
      date,
      type,
      description,
      price,
      carId
    });
    const maintenance = await newMaintenance.save();
    res.json(maintenance);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const maintenanceRecord = await Maintenance.findById(req.params.id);
    if (!maintenanceRecord) {
      return res.status(404).json({ msg: 'Maintenance record not found' });
    }
    await Maintenance.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Maintenance record deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;