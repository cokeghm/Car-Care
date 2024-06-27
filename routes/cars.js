const express = require('express');
const Car = require('../models/Car');
const auth = require('../middleware/auth');

module.exports = (upload) => {
  const router = express.Router();

  // Crear un nuevo vehículo
  router.post('/', [auth, upload.fields([
    { name: 'registrationCertificate', maxCount: 1 },
    { name: 'circulationPermit', maxCount: 1 },
    { name: 'technicalReview', maxCount: 1 },
    { name: 'mandatoryInsurance', maxCount: 1 }
  ])], async (req, res) => {
    const { brand, model, year } = req.body;

    try {
      const newCar = new Car({
        user: req.user.id,
        brand,
        model,
        year,
        registrationCertificate: req.files['registrationCertificate'] ? req.files['registrationCertificate'][0].path : null,
        circulationPermit: req.files['circulationPermit'] ? req.files['circulationPermit'][0].path : null,
        technicalReview: req.files['technicalReview'] ? req.files['technicalReview'][0].path : null,
        mandatoryInsurance: req.files['mandatoryInsurance'] ? req.files['mandatoryInsurance'][0].path : null,
      });

      const car = await newCar.save();
      res.json(car);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

  // Obtener todos los vehículos del usuario
  router.get('/', auth, async (req, res) => {
    try {
      const cars = await Car.find({ user: req.user.id });
      res.json(cars);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

  // Obtener un vehículo por ID
  router.get('/:id', auth, async (req, res) => {
    try {
      const car = await Car.findById(req.params.id);
      if (!car) return res.status(404).json({ msg: 'Car not found' });
      if (car.user.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorized' });
      res.json(car);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

  return router;
};