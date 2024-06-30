const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Maintenance = require('../models/Maintenance');

const router = express.Router();

// Crear un nuevo mantenimiento
router.post(
  '/',
  [
    auth,
    [
      check('carId', 'Car ID is required').not().isEmpty(),
      check('number', 'Number is required').not().isEmpty(),
      check('date', 'Date is required').isISO8601(),
      check('type', 'Type is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('price', 'Price is required').isNumeric()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { carId, number, date, type, description, price } = req.body;

    try {
      const newMaintenance = new Maintenance({
        carId,
        number,
        date,
        type,
        description,
        price
      });

      const maintenance = await newMaintenance.save();
      res.json(maintenance);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Obtener todos los mantenimientos de un auto
router.get('/:carId', auth, async (req, res) => {
  try {
    const maintenances = await Maintenance.find({ carId: req.params.carId });
    res.json(maintenances);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;