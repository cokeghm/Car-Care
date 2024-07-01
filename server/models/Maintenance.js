const mongoose = require('mongoose');

const MaintenanceSchema = new mongoose.Schema({
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Maintenance', MaintenanceSchema);