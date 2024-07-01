const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Maintenance = require('../models/Maintenance');
const router = express.Router();

// Crear un nuevo registro de mantenimiento
router.post(
  '/',
  [
    auth,
    [
      check('carId', 'Car ID is required').not().isEmpty(),
      check('date', 'Date is required').not().isEmpty(),
      check('type', 'Type is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('price', 'Price is required').isNumeric(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { carId, date, type, description, price } = req.body;

    try {
      const newMaintenance = new Maintenance({
        carId,
        date,
        type,
        description,
        price,
      });

      const maintenance = await newMaintenance.save();
      res.json(maintenance);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;